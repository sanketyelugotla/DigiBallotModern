import React, { useContext, useEffect } from "react";
import {
    electionDetails,
    userContext,
    loadingContext,
    databaseContext
} from "../../../Hooks/ContextProvider/ContextProvider";
import styleElection from "../CandidateDetails/Election.module.css";
import { Button } from "../../../Hooks";
import { useNavigate } from "react-router-dom";
import useElectionData from "../../../Hooks/ContextProvider/useElectionData"
import { toast } from "react-toastify";

export default function Register() {
    const { user } = useContext(userContext);
    const { selectedElection, setSelectedElection } = useContext(electionDetails);
    const { elections } = useElectionData();
    const { setLoading } = useContext(loadingContext);
    const token = localStorage.getItem("authToken");
    const { database_url } = useContext(databaseContext);

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedElection([]);
    }, []);

    const handleClick = async (election) => {
        setSelectedElection(election);
        await registerForElection(election);
    };

    async function registerForElection(item) {
        try {
            setLoading(true);
            const response = await fetch(`${database_url}/voter/register/${item._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const res = await response.json();
            if (res.success) toast.success(res.message);
            else toast.warn(res.message)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styleElection.main}>
            {elections.length > 0 ? (
                elections.map((election, index) => (
                    <div key={index} className={styleElection.electionItem} style={{ backgroundColor: election.color || '#6c757d' }}>
                        <p className={styleElection.name}>{election.name}</p>
                        <div className={styleElection.top}>
                            <p className={styleElection.para}>Candidates Registered</p>
                            <p className={styleElection.number}>{election.candidates?.length || 0}</p>
                        </div>
                        <div className={styleElection.details}>
                            <div className={styleElection.candidates}>
                                {election.candidates?.length > 0 ? (
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
