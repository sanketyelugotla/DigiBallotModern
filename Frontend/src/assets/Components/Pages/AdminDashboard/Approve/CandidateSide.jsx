import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton, Button } from '../../../../Hooks/index';
import { databaseContext } from '../../../../Hooks/ContextProvider/ContextProvider';
import styles from "./Approve.module.css"

export default function CandidateSide({ setExportData, setExportHeaders, active, isToggleAllActive }) {
    const { database_url } = useContext(databaseContext);
    const [candidates, setCandidates] = useState([]);
    const [toggleStates, setToggleStates] = useState({});
    const [loading, setLoading] = useState(true);

    const headersData = [
        { label: "Name", key: "fullName" },
        { label: "Id", key: "_id" },
        { label: "Election ID", key: "electionId" }
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

    async function fetchPendingCandidates() {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/candidates`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) throw new Error("Failed to fetch candidates");
            const res = await response.json();

            setCandidates(res);

            // Initialize toggle states
            const initialStates = res.reduce((acc, candidate) => {
                acc[`${candidate._id}_${candidate.electionId}`] = false;
                return acc;
            }, {});
            setToggleStates(initialStates);

            // Set export data dynamically
            setExportData(res);
            setExportHeaders(headersData);
        } catch (error) {
            console.log("Error fetching candidates:", error);
        } finally {
            setLoading(false);
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
    }, [active]);

    const handleToggle = (candidateId, electionId) => {
        const key = `${candidateId}_${electionId}`;
        setToggleStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleBulkApprove = async () => {
        try {
            const candidatesToApprove = candidates
                .filter((candidate) => toggleStates[`${candidate._id}_${candidate.electionId}`])
                .map((candidate) => ({
                    candidateId: candidate._id,
                    electionId: candidate.electionId,
                }));

            if (candidatesToApprove.length === 0) {
                alert("No candidates selected for approval.");
                return;
            }

            const candidateIds = candidatesToApprove.map((candidate) => candidate.candidateId);
            const electionIds = candidatesToApprove.map((candidate) => candidate.electionId);

            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/approve-candidates-bulk`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ candidateIds, electionIds }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert(data.message);
            fetchPendingCandidates();
        } catch (error) {
            console.error("Error approving candidates:", error.message);
            alert("Failed to approve candidates. Please try again.");
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading Candidates...</p>
            ) : candidates.length === 0 ? (
                <p>No candidates found.</p>
            ) : (
                <div className={styles.wholeTable}>
                    <table className={styles.tableDiv}>
                        <thead>
                            <tr>
                                <th>Candidate Name</th>
                                <th>Election Name</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate) => {
                                const candidateKey = `${candidate._id}_${candidate.electionId}`;
                                return (
                                    <tr key={candidateKey} className={styles.entry}>
                                        <td>{candidate.fullName || "Unknown"}</td>
                                        <td>{candidate.electionName}</td>
                                        <td>
                                            <ToggleButton
                                                isOn={toggleStates[candidateKey]}
                                                onToggle={() => handleToggle(candidate._id, candidate.electionId)}
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
