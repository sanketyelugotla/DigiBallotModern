import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton, Button } from '../../../../Hooks/index';
import { databaseContext, loadingContext } from '../../../../Hooks/ContextProvider/ContextProvider';
import styles from "./Approve.module.css"
import { toast } from 'react-toastify';

export default function CandidateSide({ setExportData, setExportHeaders, active, isToggleAllActive }) {
    const { database_url } = useContext(databaseContext);
    const [candidates, setCandidates] = useState([]);
    const [toggleStates, setToggleStates] = useState({});
    const [loading1, setloading1] = useState(true);
    const { setLoading } = useContext(loadingContext)

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
        setloading1(true);
        setLoading(true);

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/candidates`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const res = await response.json();
            if (!res.success) toast.error(res.message);

            setCandidates(res.candidates);

            // Initialize toggle states
            const initialStates = res.candidates.reduce((acc, candidate) => {
                acc[`${candidate._id}_${candidate.electionId}`] = false;
                return acc;
            }, {});
            setToggleStates(initialStates);

            // Set export data dynamically
            setExportData(res.candidates);
            setExportHeaders(headersData);
        } catch (error) {
            toast.error("Error fetching candidates: ", error.message);
            console.log("Error fetching candidates:", error);
        } finally {
            setloading1(false);
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
        setLoading(true);
        try {
            const candidatesToApprove = candidates
                .filter((candidate) => toggleStates[`${candidate._id}_${candidate.electionId}`])
                .map((candidate) => ({
                    candidateId: candidate._id,
                    electionId: candidate.electionId,
                }));

            if (candidatesToApprove.length === 0) {
                toast.warn("No candidates selected for approval.");
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
            if (!data.success) toast.error(data.message);

            toast.success(data.message);
            fetchPendingCandidates();
        } catch (error) {
            console.error("Error approving candidates:", error.message);
            toast.error("Error approving candidates: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading1 ? (
                <p className={styles.noData}>loading Candidates...</p>
            ) : candidates.length === 0 ? (
                <p className={styles.noData}>No candidates found.</p>
            ) : (
                <div className={styles.wholeTable}>
                    <table className={styles.tableDiv}>
                        <thead>
                            <tr>
                                <th>Candidate Name</th>
                                <th>Election Name</th>
                                <th>Party Name</th>
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
                                        <td>{candidate.partyName}</td>
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
