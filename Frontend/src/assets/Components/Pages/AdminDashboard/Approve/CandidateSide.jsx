import React, { useContext, useEffect, useState } from 'react';
import { ToggleButton, Button } from '../../../../Hooks/index';
import { databaseContext, loadingContext } from '../../../../Hooks/ContextProvider/ContextProvider';
import { SelectedElectionContext, SelectedStatusContext } from '../../../../Hooks/ContextProvider/FilterContext';
import styles from "./Approve.module.css";
import { toast } from 'react-toastify';

export default function CandidateSide({ setExportData, setExportHeaders, active, isToggleAllActive }) {
    const { database_url } = useContext(databaseContext);
    const { setLoading } = useContext(loadingContext);

    // Properly consume both contexts with fallbacks
    const { selectedStatuses = [] } = useContext(SelectedStatusContext) || {};
    const { selectedElections = [] } = useContext(SelectedElectionContext) || {};

    const [candidates, setCandidates] = useState([]);
    const [toggleStates, setToggleStates] = useState({});
    const [loading1, setloading1] = useState(true);

    const headersData = [
        { label: "Name", key: "fullName" },
        { label: "Email", key: "email" },
        { label: "Id", key: "_id" },
        { label: "Election ID", key: "electionId" },
        { label: "Status", key: "status" },
        { label: "Election Name", key: "electionName" },
        { label: "Party Name", key: "partyName" }
    ];

    // Initialize toggle states when bulk toggle changes
    useEffect(() => {
        const newToggleStates = {};
        candidates.forEach(candidate => {
            const key = `${candidate._id}_${candidate.electionId}`;
            newToggleStates[key] = isToggleAllActive;
        });
        setToggleStates(newToggleStates);
    }, [isToggleAllActive, candidates]);

    // Fetch candidates with filter criteria
    const fetchFilteredCandidates = async () => {
        try {
            setLoading(true);
            setloading1(true);
            const token = localStorage.getItem("authToken");

            // Prepare filter payload with safe defaults
            const currentStatuses = Array.isArray(selectedStatuses) ? selectedStatuses : [];
            const currentElections = Array.isArray(selectedElections) ? selectedElections : [];

            const filterPayload = {
                statuses: currentStatuses.includes("All") ? [] : currentStatuses,
                electionIds: currentElections.includes("all") ? [] : currentElections
            };

            const response = await fetch(`${database_url}/admin/candidates/filter`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(filterPayload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const res = await response.json();

            if (!res.success) {
                throw new Error(res.message || "Failed to fetch candidates");
            }

            setCandidates(res.candidates || []);

            // Initialize toggle states
            const initialStates = {};
            (res.candidates || []).forEach(candidate => {
                initialStates[`${candidate._id}_${candidate.electionId}`] = false;
            });
            setToggleStates(initialStates);

            // Update export data
            setExportData(res.candidates || []);
            setExportHeaders(headersData);

        } catch (error) {
            toast.error(error.message);
            console.error("Error fetching candidates:", error);
        } finally {
            setloading1(false);
            setLoading(false);
        }
    };

    // Fetch candidates when filters change or component mounts
    useEffect(() => {
        fetchFilteredCandidates();
    }, [selectedStatuses, selectedElections]);

    // Update export data when active tab changes
    useEffect(() => {
        if (active) {
            setExportData(candidates);
            setExportHeaders(headersData);
        }
    }, [active, candidates]);

    const handleToggle = (candidateId, electionId) => {
        const key = `${candidateId}_${electionId}`;
        setToggleStates(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleBulkApprove = async () => {
        try {
            setLoading(true);

            // Prepare approval payload
            const candidatesToApprove = candidates
                .filter(candidate => toggleStates[`${candidate._id}_${candidate.electionId}`])
                .map(candidate => ({
                    candidateId: candidate._id,
                    electionId: candidate.electionId,
                    status: "approved" // Explicitly setting status
                }));

            if (candidatesToApprove.length === 0) {
                toast.warn("No candidates selected for approval");
                return;
            }

            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/candidates/approve`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ approvals: candidatesToApprove })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Approval failed");
            }

            toast.success(data.message);

            // Refresh the candidate list after approval
            await fetchFilteredCandidates();

        } catch (error) {
            toast.error(error.message);
            console.error("Error approving candidates:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wholeDiv}>
            {loading1 ? (
                <p className={styles.noData}>Loading Candidates...</p>
            ) : candidates.length === 0 ? (
                <p className={styles.noData}>No candidates found matching your filters</p>
            ) : (
                <div className={styles.wholeTable}>
                    <table className={styles.tableDiv}>
                        <thead>
                            <tr>
                                <th>Candidate Name</th>
                                {/* <th>Email</th> */}
                                <th>Election Name</th>
                                <th>Party Name</th>
                                <th>Status</th>
                                {/* <th>Select</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => {
                                const candidateKey = `${candidate._id}_${candidate.electionId}`;
                                return (
                                    <tr key={candidateKey} className={styles.entry}>
                                        <td>{candidate.fullName || "Unknown"}</td>
                                        {/* <td>{candidate.email || "Unknown"}</td> */}
                                        <td>{candidate.electionName || "Unknown"}</td>
                                        <td>{candidate.partyName || "Unknown"}</td>
                                        {/* <td className={styles[candidate.status?.toLowerCase()]}>
                                            {candidate.status}
                                        </td> */}
                                        <td>
                                            <center>
                                                {
                                                    candidate.status === "pending" ? (
                                                        <ToggleButton
                                                            isOn={toggleStates[candidateKey] || false}
                                                            onToggle={() => handleToggle(candidate._id, candidate.electionId)}
                                                        />
                                                    ) : (
                                                        candidate.status
                                                    )
                                                }
                                            </center>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className={styles.actionBar}>
                        <Button
                            className={styles.approveButton}
                            onClick={handleBulkApprove}
                            disabled={!Object.values(toggleStates).some(state => state)}
                        >
                            Approve Selected
                        </Button>
                        <span className={styles.selectionCount}>
                            {Object.values(toggleStates).filter(state => state).length} selected
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}