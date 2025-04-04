import React, { useContext, useEffect, useState } from "react";
import { ToggleButton, Button } from "../../../../Hooks/index";
import { databaseContext, loadingContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import styles from "./Approve.module.css";
import { toast } from "react-toastify";

export default function UserSide({ setExportData, setExportHeaders, active, isToggleAllActive }) {
    const { database_url } = useContext(databaseContext);
    const [users, setUsers] = useState([]);
    const [toggleStates, setToggleStates] = useState({});
    const [loading1, setloading1] = useState(true);
    const { setLoading } = useContext(loadingContext)

    const headersData = [
        { label: "Name", key: "name" },
        { label: "Id", key: "_id" },
        { label: "Election ID", key: "electionId" },
    ];

    useEffect(() => {
        setToggleStates((prev) => {
            const newState = {};
            Object.keys(prev).forEach((key) => {
                newState[key] = isToggleAllActive; // Set all toggles to match the global toggle
            });
            return newState;
        });
    }, [isToggleAllActive]);

    async function fetchPendingUsers() {
        try {
            setLoading(true);
            setloading1(true);
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/users`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const res = await response.json();
            if (!res.success) toast.error("Failed to fetch users");

            setUsers(res.users);

            // Initialize toggle states
            const initialStates = res.users.reduce((acc, user) => {
                acc[`${user._id}_${user.electionId}`] = false;
                return acc;
            }, {});
            setToggleStates(initialStates);

            setExportData(res.users);
            setExportHeaders(headersData);
        } catch (error) {
            toast.warn("Error fetching users: ", res.message)
            console.error("Error fetching users:", error.message);
        } finally {
            setloading1(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    useEffect(() => {
        if (active) {
            setExportData(users);
            setExportHeaders(headersData);
        }
    }, [active]);

    const handleToggle = (userId, electionId) => {
        const key = `${userId}_${electionId}`; // Ensure `_` is used as separator
        setToggleStates((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleBulkApprove = async () => {
        try {
            setLoading(true);
            const usersToApprove = users
                .filter((user) => toggleStates[`${user._id}_${user.electionId}`])
                .map((user) => ({
                    userId: user._id,
                    electionId: user.electionId,
                }));

            if (usersToApprove.length === 0) {
                toast.warn("No users selected for approval.");
                return;
            }

            const userIds = usersToApprove.map((user) => user.userId);
            const electionIds = usersToApprove.map((user) => user.electionId);

            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/approve-users-bulk`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ userIds, electionIds }),
            });

            const data = await response.json();
            if (!data.success) toast.error(data.message);

            toast.success(data.message);
            fetchPendingUsers();
        } catch (error) {
            console.error("Error approving users:", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading1 ? (
                <p className={styles.noData}>loading Users...</p>
            ) : users.length === 0 ? (
                <p className={styles.noData}>No users found.</p>
            ) : (
                <div className={styles.wholeTable}>
                    <table className={styles.tableDiv}>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Election Name</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                const userKey = `${user._id}_${user.electionId}`;
                                return (
                                    <tr key={userKey} className={styles.entry}>
                                        <td>{user.name || "Unknown"}</td>
                                        <td>{user.electionName}</td>
                                        <td>
                                            <ToggleButton
                                                isOn={toggleStates[userKey]}
                                                onToggle={() => handleToggle(user._id, user.electionId)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Button className={styles.approveButton} onClick={handleBulkApprove}>
                        Approve
                    </Button>
                </div>
            )}
        </div>
    );
}
