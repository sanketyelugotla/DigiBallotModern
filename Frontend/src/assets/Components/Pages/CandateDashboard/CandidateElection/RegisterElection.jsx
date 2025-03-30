import React, { useContext, useEffect, useState } from "react";
import { databaseContext, electionDetails, userContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import styleElection from "../../CandidateDetails/Election.module.css";
import { Button } from "../../../../Hooks";
import { useNavigate } from "react-router-dom";

export default function RegisterElection() {
    const { user } = useContext(userContext);
    const { selectedElection, setSelectedElection } = useContext(electionDetails);
    const { database_url } = useContext(databaseContext);
    const [elections, setElections] = useState([]);
    const [candidates, setCandidates] = useState({});
    const token = localStorage.getItem("authToken");

    async function fetchElections() {
        try {
            const response = await fetch(`${database_url}/election/all`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            setElections(res);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    }

    async function fetchCandidates(electionId) {
        try {
            const response = await fetch(`${database_url}/candidates/${electionId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
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
        // navigate('/candidateDashboard/register');
    }

    async function registerForElection(item) {
        try {
            const token = localStorage.getItem("authToken");
            console.log(item)
            const response = await fetch(`${database_url}/candidates/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ electionId: item._id }),
            });

            const res = await response.json();
            console.log(res)
            if (res.success) window.alert("Registeres successfylly! Please wait for admin approval");
            else window.alert(res.message)
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
