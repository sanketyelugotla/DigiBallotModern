import React, { useContext, useEffect, useState } from "react";
import { databaseContext, electionDetails, userContext } from "../../../Hooks/ContextProvider/ContextProvider";
import styleElection from "../CandidateDetails/Election.module.css";
import { Button } from "../../../Hooks";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { user } = useContext(userContext);
    const { selectedElection, setSelectedElection } = useContext(electionDetails);
    const { database_url } = useContext(databaseContext);
    const [elections, setElections] = useState([]);
    const [candidates, setCandidates] = useState({});

    async function fetchElections() {
        try {
            const response = await fetch(`${database_url}/election/all`);
            const res = await response.json();
            setElections(res);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    }

    async function fetchCandidates(electionId) {
        try {
            const response = await fetch(`${database_url}/candidates/${electionId}`);
            const res = await response.json();
            setCandidates((prev) => ({
                ...prev,
                [electionId]: res,
            }));
        } catch (error) {
            console.error("Error fetching candidates:", error);
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
        setSelectedElection(item);
        registerForElection(item);
    }

    async function registerForElection(item) {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/voter/register/${item._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const res = await response.json();
            console.log(res)
            if (res.success) window.alert("Registeres successfylly! Please wait for admin approval");
            else window.alert(res)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={styleElection.main}>
            {elections.length > 0 ? (
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
                                Register
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
