import React, { useContext, useEffect, useState } from "react";
import { ToggleButton, Button } from "../../../../Hooks/index";
import { databaseContext } from "../../../../Hooks/ContextProvider/ContextProvider";

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
        setLoading(true); // Start loading
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/users`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch users");
            const res = await response.json();

            // Deduplicate users based on `_id` and `electionId`
            const uniqueUsers = res.reduce((acc, user) => {
                const key = `${user._id}-${user.electionId}`;
                if (!acc.some((u) => `${u._id}-${u.electionId}` === key)) {
                    acc.push(user);
                }
                return acc;
            }, []);

            setUsers(uniqueUsers);

            // Initialize toggle states
            const initialStates = uniqueUsers.reduce((acc, user) => {
                acc[`${user._id}-${user.electionId}`] = false;
                return acc;
            }, {});
            setToggleStates(initialStates);

            // Set export data dynamically
            setExportData(uniqueUsers);
            setExportHeaders(headersData);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        } finally {
            setLoading(false); // Stop loading
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

    return (
        <div>
            {loading ? (
                <p>Loading Users...</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div>
                    {users.map((user) => {
                        const userKey = `${user._id}-${user.electionId}`;
                        return (
                            <div key={userKey}>
                                <p>{user.name || "Unknown"} - {toggleStates[userKey] ? "On" : "Off"}</p>
                                <ToggleButton isOn={toggleStates[userKey]} onToggle={() => handleToggle(userKey)} />
                            </div>
                        );
                    })}
                    <Button onClick={handleBulkApprove}>Approve Selected Users</Button>
                </div>
            )}
        </div>
    );
}
