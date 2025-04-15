import React, { useContext, useEffect, useState } from "react";
import {
    databaseContext,
    electionDetails,
    loadingContext,
} from "../../../Hooks/ContextProvider/ContextProvider";
import styleElection from "./Election.module.css";
import { Button } from "../../../Hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SelectElection() {
    const { selectedElection, setSelectedElection } = useContext(electionDetails);
    const { database_url } = useContext(databaseContext);
    const { setLoading } = useContext(loadingContext);

    const [elections, setElections] = useState([]);
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const fetchElectionsWithCandidates = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${database_url}/election/allDetails`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const res = await response.json();
            if (res.success) {
                setElections(res.elections);
            } else {
                toast.warn("Failed to load elections: " + res.message);
            }
        } catch (error) {
            console.error("Error fetching elections:", error);
            toast.error("Server error while fetching elections");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSelectedElection([]);
        fetchElectionsWithCandidates();
    }, []);

    const handleClick = (election) => {
        setSelectedElection(election);
        navigate("/candidate/details");
    };

    return (
        <div className={styleElection.main}>
            {elections && elections.length > 0 ? (
                elections.map((election, index) => (
                    <div key={index} style={{ backgroundColor: election.color || '#6c757d' }} className={styleElection.electionItem}>
                        <p className={styleElection.name}>{election.name}</p>
                        <div className={styleElection.top}>
                            <p className={styleElection.para}>Candidates Registered</p>
                            <p className={styleElection.number}>
                                {election.candidates?.length ?? 0}
                            </p>
                        </div>
                        <div className={styleElection.details}>
                            <div className={styleElection.candidates}>
                                {election.candidates && election.candidates.length > 0 ? (
                                    election.candidates.map((candidate, i) => (
                                        <p key={i} className={styleElection.candidateName}>
                                            {candidate.fullName}
                                        </p>
                                    ))
                                ) : (
                                    <p className={styleElection.candidateName}>No candidates registered yet.</p>
                                )}
                            </div>
                            <Button
                                variant="light"
                                className={styleElection.button}
                                onClick={() => handleClick(election)}
                            >
                                Details
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading elections...</p>
            )}
        </div>
    );
}
