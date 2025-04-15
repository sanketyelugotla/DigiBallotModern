import React, { useContext, useEffect, useState } from "react";
import { ToggleButton, Button } from "../../../../Hooks/index";
import { databaseContext, loadingContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import { SelectedElectionContext, SelectedStatusContext } from "../../../../Hooks/ContextProvider/FilterContext";
import styles from "./Approve.module.css";
import { toast } from "react-toastify";

export default function UserSide({ setExportData, setExportHeaders, active, isToggleAllActive }) {
    const { database_url } = useContext(databaseContext);
    const { setLoading } = useContext(loadingContext);

    // Properly consume both contexts
    const { selectedStatuses = [] } = useContext(SelectedStatusContext) || {};
    const { selectedElections = [] } = useContext(SelectedElectionContext) || {};

    const [users, setUsers] = useState([]);
    const [toggleStates, setToggleStates] = useState({});
    const [loading1, setloading1] = useState(true);

    const headersData = [
        { label: "Name", key: "name" },
        { label: "Id", key: "_id" },
        { label: "Election ID", key: "electionId" },
        { label: "Status", key: "status" },
        { label: "Election Name", key: "electionName" }
    ];

    useEffect(() => {
        const newToggleStates = {};
        users.forEach(user => {
            const key = `${user._id}_${user.electionId}`;
            newToggleStates[key] = isToggleAllActive;
        });
        setToggleStates(newToggleStates);
    }, [isToggleAllActive, users]);

    const fetchFilteredUsers = async () => {
        try {
            setLoading(true);
            setloading1(true);
            const token = localStorage.getItem("authToken");

            // Safely handle potentially undefined filters with default empty arrays
            const currentStatuses = Array.isArray(selectedStatuses) ? selectedStatuses : [];
            const currentElections = Array.isArray(selectedElections) ? selectedElections : [];

            const filterPayload = {
                statuses: currentStatuses.includes("All") ? [] : currentStatuses,
                electionIds: currentElections.includes("all") ? [] : currentElections
            };

            const response = await fetch(`${database_url}/admin/users/filter`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(filterPayload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const res = await response.json();

            if (!res.success) {
                throw new Error(res.message || "Failed to fetch users");
            }

            setUsers(res.users || []);

            // Initialize toggle states
            const initialStates = {};
            (res.users || []).forEach(user => {
                initialStates[`${user._id}_${user.electionId}`] = false;
            });
            setToggleStates(initialStates);

            setExportData(res.users || []);
            setExportHeaders(headersData);

        } catch (error) {
            toast.error(error.message);
            console.error("Error fetching users:", error);
        } finally {
            setloading1(false);
            setLoading(false);
        }
    };

    // Fetch users when filters change or component mounts
    useEffect(() => {
        fetchFilteredUsers();
    }, [selectedStatuses, selectedElections]);

    useEffect(() => {
        if (active) {
            setExportData(users);
            setExportHeaders(headersData);
        }
    }, [active, users]);

    const handleToggle = (userId, electionId) => {
        const key = `${userId}_${electionId}`;
        setToggleStates(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleBulkApprove = async () => {
        try {
            setLoading(true);

            const usersToApprove = users
                .filter(user => toggleStates[`${user._id}_${user.electionId}`])
                .map(user => ({
                    userId: user._id,
                    electionId: user.electionId,
                    status: "approved"
                }));

            if (usersToApprove.length === 0) {
                toast.warn("No users selected for approval");
                return;
            }

            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/users/approve`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ approvals: usersToApprove })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Approval failed");
            }

            toast.success(data.message);
            await fetchFilteredUsers();

        } catch (error) {
            toast.error(error.message);
            console.error("Error approving users:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wholeDiv}>
            {loading1 ? (
                <p className={styles.noData}>Loading Users...</p>
            ) : users.length === 0 ? (
                <p className={styles.noData}>No users found matching your filters</p>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.tableDiv}>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Election Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {users.map(user => {
                                const userKey = `${user._id}_${user.electionId}`;
                                return (
                                    <tr key={userKey} className={styles.entry}>
                                        <td>{user.name || "Unknown"}</td>
                                        <td>{user.electionName || "Unknown"}</td>
                                        <td className={styles.captilize}>
                                            <center>
                                                {user.status === "pending" ? (
                                                    <ToggleButton
                                                        isOn={toggleStates[userKey] || false}
                                                        onToggle={() => handleToggle(user._id, user.electionId)}
                                                    />
                                                ) : (
                                                    user.status
                                                )}
                                            </center>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className={styles.actionBar}>
                        <Button
                            className={styles.approveButton}
                            onClick={handleBulkApprove}
                            disabled={!Object.values(toggleStates).some(state => state)}
                        >
                            Approve Selected
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}