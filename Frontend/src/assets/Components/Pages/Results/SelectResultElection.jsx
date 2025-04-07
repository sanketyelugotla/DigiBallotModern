import React, { useContext, useEffect, useState } from "react";
import {
    databaseContext,
    electionDetails,
    loadingContext,
} from "../../../Hooks/ContextProvider/ContextProvider";
import styleElection from "../CandidateDetails/Election.module.css";
import { Button } from "../../../Hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SelectResultElection() {
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
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await response.json();
            if (res.success) {
                setElections(res.elections);
            } else {
                toast.warn("Failed to load elections: " + res.message);
            }
        } catch (error) {
            toast.error("Error fetching elections: " + error.message);
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSelectedElection([]);
        fetchElectionsWithCandidates();
    }, []);

    const handleClick = (item) => {
        setSelectedElection(item);
        navigate("/results");
    };

    return (
        <div className={styleElection.main}>
            {elections.length > 0 ? (
                elections.map((item, index) => (
                    <div key={index} style={{ backgroundColor: item.color || '#6c757d' }} className={styleElection.electionItem}>
                        <p className={styleElection.name}>{item.name}</p>
                        <div className={styleElection.top}>
                            <p className={styleElection.para}>Candidates Registered</p>
                            <p className={styleElection.number}>
                                {item.candidates ? item.candidates.length : "Loading..."}
                            </p>
                        </div>
                        <div className={styleElection.details}>
                            <div className={styleElection.candidates}>
                                {item.candidates && item.candidates.length > 0 ? (
                                    item.candidates.map((candidate, i) => (
                                        <p key={i} className={styleElection.candidateName}>
                                            {candidate.fullName}
                                        </p>
                                    ))
                                ) : (
                                    <p className={styleElection.candidateName}>
                                        No candidates registered yet
                                    </p>
                                )}
                            </div>
                            <Button
                                variant="light"
                                className={styleElection.button}
                                onClick={() => handleClick(item)}
                            >
                                See Results
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
