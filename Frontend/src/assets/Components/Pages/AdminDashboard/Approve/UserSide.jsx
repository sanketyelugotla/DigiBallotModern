import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton, Button } from '../../../../Hooks/index';
import { databaseContext } from '../../../../Hooks/ContextProvider/ContextProvider';

export default function UserSide({ setExportData, setExportHeaders, active }) {
    const { database_url } = useContext(databaseContext);
    const [users, setUsers] = useState([]);
    const [toggleStates, setToggleStates] = useState({});
    const headersData = [
        { label: "Name", key: "userId.name" },
        { label: "Id", key: "_id" }
    ];

    async function fetchPendingUsers() {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/users`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) throw new Error("Failed to fetch users");
            const res = await response.json();
            setUsers(res);

            // Initialize toggle states
            const initialStates = res.reduce((acc, user) => {
                acc[user._id] = false;
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
        if (!active) {
            setExportData(users);
            setExportHeaders(headersData);
        }
    }, [active])

    const handleToggle = (userId) => {
        setToggleStates((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    return (
        <div>
            {users.length > 0 ? (
                <div>
                    {users.map((user) => (
                        <div key={user._id}>
                            <p>{user.userId?.name || "Unknown"} - {toggleStates[user._id] ? "On" : "Off"}</p>
                            <ToggleButton isOn={toggleStates[user._id]} onToggle={() => handleToggle(user._id)} />
                        </div>
                    ))}
                    <Button>Approve</Button>
                </div>
            ) : (
                <p>Loading Users...</p>
            )}
        </div>
    );
}
