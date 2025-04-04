import React, { useContext, useEffect, useState } from "react";
import { databaseContext, electionDetails, loadingContext } from "../../../Hooks/ContextProvider/ContextProvider";
import styleElection from "./Election.module.css";
import { Button } from "../../../Hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SelectElection() {
    const { selectedElection, setSelectedElection } = useContext(electionDetails);
    const { database_url } = useContext(databaseContext);
    const [elections, setElections] = useState([]);
    const [candidates, setCandidates] = useState({});
    const token = localStorage.getItem("authToken");
    const { setLoading } = useContext(loadingContext)

    async function fetchElections() {
        try {
            setLoading(true);
            const response = await fetch(`${database_url}/election/all`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            if (res.success) {
                setElections(res.elections);
            } else toast.warn("Error fetching election: ", res.message);
        } catch (error) {
            toast.error("Error fetching elections:", error.message);
            console.error("Error fetching elections:", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchCandidates(electionId) {
        try {
            setLoading(true);
            const response = await fetch(`${database_url}/candidates/${electionId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            if (res.success) {
                setCandidates((prev) => ({
                    ...prev,
                    [electionId]: res.candidates,
                }));
            } else toast.warn("Error fetching candidates:", res.message)
        } catch (error) {
            toast.error("Error fetching candidates:", error.message);
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setSelectedElection([]);
        fetchElections();
    }, []);

    useEffect(() => {
        elections.forEach((election) => {
            fetchCandidates(election._id);
        });
    }, [elections]);

    const navigate = useNavigate();
    function handleClick(item) {
        // console.log(item);
        setSelectedElection(item);
        navigate('/candidate/details');
    }

    return (
        <div className={styleElection.main}>
            {elections && elections.length > 0 ? (
                elections.map((item, index) => (
                    <div key={index} className={styleElection.electionItem}>
                        <p className={styleElection.name}>{item.name}</p>
                        <div className={styleElection.top}>
                            <p className={styleElection.para}>Candidates Registered</p>
                            <p className={styleElection.number}>
                                {candidates[item._id] ? candidates[item._id].length : "Loading..."}
                            </p>
                        </div>
                        <div className={styleElection.details}>
                            <div className={styleElection.candidates}>
                                {candidates[item._id] ? (
                                    candidates[item._id].map((candidate, i) => (
                                        <p key={i} className={styleElection.candidateName}>{candidate.fullName}</p>
                                    ))
                                ) : (
                                    <p>Loading candidates...</p>
                                )}
                            </div>
                            <Button
                                variant="light"
                                className={styleElection.button}
                                onClick={() => handleClick(item)}
                            >
                                {/* {console.log(item)} */}
                                Details
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
