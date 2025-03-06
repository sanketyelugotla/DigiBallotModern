import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton } from '../../../../Hooks/index';
import { databaseContext } from '../../../../Hooks/ContextProvider/ContextProvider';

export default function CandidateSide() {
    const { database_url } = useContext(databaseContext);
    const [candidates, setCandidates] = useState([]);
    const [toggleStates, setToggleStates] = useState({}); // Store toggle states

    async function fetchPendingCandidates() {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/candidates`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            const res = await response.json();
            setCandidates(res);

            // Initialize toggle states for each candidate
            const initialStates = res.reduce((acc, candidate) => {
                acc[candidate.id] = false; // Default all toggles to 'false' (off)
                return acc;
            }, {});
            setToggleStates(initialStates);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPendingCandidates();
    }, []);

    // Function to handle toggle change
    const handleToggle = (candidateId) => {
        setToggleStates((prev) => ({
            ...prev,
            [candidateId]: !prev[candidateId],
        }));
    };

    return (
        <div>
            {candidates.length > 0 ? (
                <div>
                    {candidates.map((item) => (
                        <div key={item.id}>
                            <p>{item.fullName} - {toggleStates[item.id] ? "On" : "Off"}</p>
                            <ToggleButton isOn={toggleStates[item.id]} onToggle={() => handleToggle(item.id)} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading Candidates...</p>
            )}
        </div>
    );
}
