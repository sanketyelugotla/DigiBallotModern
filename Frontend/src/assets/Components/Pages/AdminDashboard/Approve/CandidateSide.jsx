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

            // Ensure each candidate gets a unique electionId as a string or number


            console.log(res);
            setCandidates(res);

            // Fix toggle states key structure
            const initialStates = expandedCandidates.reduce((acc, candidate) => {
                acc[`${candidate._id}_${candidate.electionId}`] = false; // Ensure key is a string
                return acc;
            }, {});
            setToggleStates(initialStates);

            // Set export data dynamically
            setExportData(expandedCandidates);
            setExportHeaders(headersData);
        } catch (error) {
            console.log("Error fetching candidates:", error);
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
            // Get selected candidates with their electionIds
            const candidatesToApprove = candidates
                .filter((candidate) => toggleStates[`${candidate._id}_${candidate.electionId}`])
                .map((candidate) => ({
                    candidateId: candidate._id,
                    electionId: candidate.electionId, // Already fixed as string
                }));

            if (candidatesToApprove.length === 0) {
                alert("No candidates selected for approval.");
                return;
            }

            // Extract candidateIds and electionIds into separate arrays
            const candidateIds = candidatesToApprove.map((candidate) => candidate.candidateId);
            const electionIds = candidatesToApprove.map((candidate) => candidate.electionId);

            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/approve-candidates-bulk`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    candidateIds: candidateIds,
                    electionIds: electionIds
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert(data.message); // Success message
            fetchPendingCandidates(); // Refresh the list of candidates
        } catch (error) {
            console.error("Error approving candidates:", error.message);
            alert("Failed to approve candidates. Please try again.");
        }
    };

    return (
        <div>
            {candidates.length > 0 ? (
                <div>
                    {candidates.map((item) => (
                        <div key={`${item._id}_${item.electionId}`}> {/* Fix: Unique key */}
                            <p>{item.fullName} - {toggleStates[`${item._id}_${item.electionId}`] ? "On" : "Off"}</p>
                            <ToggleButton
                                isOn={toggleStates[`${item._id}_${item.electionId}`]}
                                onToggle={() => handleToggle(item._id, item.electionId)}
                            />
                        </div>
                    ))}
                    <Button onClick={handleBulkApprove}>Approve Selected Candidates</Button>
                </div>
            ) : (
                <p>Loading Candidates...</p>
            )}
        </div>
    );
}
