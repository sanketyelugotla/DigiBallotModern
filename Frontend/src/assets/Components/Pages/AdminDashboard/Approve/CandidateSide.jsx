import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton, Button } from '../../../../Hooks/index';
import { databaseContext } from '../../../../Hooks/ContextProvider/ContextProvider';

export default function CandidateSide({ setExportData, setExportHeaders, active }) {
    const { database_url } = useContext(databaseContext);
    const [candidates, setCandidates] = useState([]);
    const [toggleStates, setToggleStates] = useState({});
    const headersData = [
        { label: "Name", key: "fullName" },
        { label: "Id", key: "_id" }
    ];

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

            // Initialize toggle states
            const initialStates = res.reduce((acc, candidate) => {
                acc[candidate._id] = false;
                return acc;
            }, {});
            setToggleStates(initialStates);

            // Set export data dynamically
            setExportData(res);
            setExportHeaders(headersData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPendingCandidates();
    }, []);

    useEffect(() => {
        if (active) {
            setExportData(candidates);
            setExportHeaders(headersData);
        }
    }, [active])

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
                        <div key={item._id}>
                            <p>{item.fullName} - {toggleStates[item._id] ? "On" : "Off"}</p>
                            <ToggleButton isOn={toggleStates[item._id]} onToggle={() => handleToggle(item._id)} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading Candidates...</p>
            )}
        </div>
    );
}
