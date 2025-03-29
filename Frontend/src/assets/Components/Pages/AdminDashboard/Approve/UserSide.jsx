import React, { useContext, useEffect, useState } from "react";
import { ToggleButton, Button } from "../../../../Hooks/index";
import { databaseContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import styles from "./Approve.module.css"

export default function UserSide({ setExportData, setExportHeaders, active }) {
    const { database_url } = useContext(databaseContext);
    const [users, setUsers] = useState([]);
    const [toggleStates, setToggleStates] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    const headersData = [
        { label: "Name", key: "name" },
        { label: "Id", key: "_id" },
        { label: "Election ID", key: "electionId" },
    ];

    async function fetchPendingUsers() {
        try {
            setLoading(true); // Start loading before API call
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/users`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch users");
            const res = await response.json();

            setUsers(res); // Store all entries

            // Initialize toggle states
            const initialStates = res.reduce((acc, user) => {
                acc[`${user._id}-${user.electionId}`] = false; // Ensure unique toggle states
                return acc;
            }, {});
            setToggleStates(initialStates);

            // Set export data dynamically
            setExportData(res);
            setExportHeaders(headersData);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        } finally {
            setLoading(false); // Stop loading after API call completes
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

    const handleToggle = (userKey) => {
        setToggleStates((prev) => ({
            ...prev,
            [userKey]: !prev[userKey]
        }));
    };

    const handleBulkApprove = async () => {
        try {
            const usersToApprove = users.filter((user) => toggleStates[user._id]);
            if (usersToApprove.length === 0) {
                alert("No users selected for approval.");
                return;
            }

            const userIds = usersToApprove.map((user) => user._id);

            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/approve-users-bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ userIds })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert(data.message); // Success message
            fetchPendingUsers(); // Refresh the list of users
        } catch (error) {
            console.error("Error approving users:", error.message);
            alert("Failed to approve users. Please try again.");
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading Users...</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <>
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
                                const userKey = `${user._id}-${user.electionId}`;
                                return (
                                    <tr key={userKey} className={styles.entry}>
                                        <td>{user.name || "Unknown"}</td>
                                        <td>{user.electionName}</td>
                                        <td>
                                            <ToggleButton
                                                isOn={toggleStates[userKey]}
                                                onToggle={() => handleToggle(userKey)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Button className={styles.approveButton} onClick={handleBulkApprove}>
                        Approve Selected Users
                    </Button>
                </>
            )
            }
        </div >
    );
}
