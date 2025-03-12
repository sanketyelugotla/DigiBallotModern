import React, { useContext, useEffect, useState } from "react";
import { ToggleButton, Button } from "../../../../Hooks/index";
import { databaseContext } from "../../../../Hooks/ContextProvider/ContextProvider";

export default function UserSide({ setExportData, setExportHeaders, active }) {
    const { database_url } = useContext(databaseContext);
    const [users, setUsers] = useState([]);
    const [toggleStates, setToggleStates] = useState({});

    const headersData = [
        { label: "Name", key: "name" },
        { label: "Id", key: "_id" },
        { label: "Election ID", key: "electionId" },
        { label: "Status", key: "status" }
    ];

    async function fetchPendingUsers() {
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
            console.log(res);

            // Store all entries without deduplication
            setUsers(res);

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
            // Get selected users with their electionIds
            const usersToApprove = users
                .filter((user) => toggleStates[`${user._id}-${user.electionId}`])
                .map((user) => ({
                    userId: user._id,
                    electionId: user.electionId, // Ensuring electionId is included
                }));

            if (usersToApprove.length === 0) {
                alert("No users selected for approval.");
                return;
            }

            // Extract userIds and electionIds into separate arrays
            const userIds = usersToApprove.map((user) => user.userId);
            const electionIds = usersToApprove.map((user) => user.electionId);

            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/approve-users-bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userIds: userIds,
                    electionIds: electionIds
                }),
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
            {users.length > 0 ? (
                <div>
                    {users.map((user) => {
                        const userKey = `${user._id}-${user.electionId}`; // Unique key for users with multiple election entries
                        return (
                            <div key={userKey}>
                                <p>{user.name || "Unknown"} - {toggleStates[userKey] ? "On" : "Off"}</p>
                                <ToggleButton isOn={toggleStates[userKey]} onToggle={() => handleToggle(userKey)} />
                            </div>
                        );
                    })}
                    <Button onClick={handleBulkApprove}>Approve Selected Users</Button>
                </div>
            ) : (
                <p>Loading Users...</p>
            )}
        </div>
    );
}
