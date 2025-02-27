import React, { useContext, useEffect, useState } from 'react'
import { databaseContext } from '../../../../Hooks/ContextProvider/ContextProvider';

export default function CandidateSide() {
    const { database_url } = useContext(databaseContext);
    const [candidates, setCandidates] = useState([]);

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
            console.log(res);
            setCandidates(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPendingCandidates();
    }, [])

    return (
        <div>
            {
                candidates.length > 0 ? (
                    <div>
                        {candidates.map((item, index) => (
                            <p key={index}>{item.fullName}</p>
                        ))}
                    </div>
                ) : <p>Loading Candidates...</p>
            }
        </div>
    )
}
