import React, { useContext, useState } from 'react'
import styleVote from "./Vote.module.css"
import { Link } from 'react-router-dom'
import { HoverDiv, Button, FadeDiv } from '../../../Hooks/index'
import { partiesContext, databaseContext, electionDetails } from '../../../Hooks/ContextProvider/ContextProvider'

export default function ConfirmVote({ onClose }) {
    const { selectedParty } = useContext(partiesContext);
    const [isOpted, setIsopted] = useState(false);
    const { database_url } = useContext(databaseContext);
    const { selectedElection } = useContext(electionDetails);

    function handleIsopted() {
        setIsopted(!isOpted);
    }

    async function handleVote() {
        console.log(selectedParty);
        const authToken = localStorage.getItem("authToken");
        console.log(authToken)
        const response = await fetch(`${database_url}/voter/vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify({ candidateId: selectedParty.candidateId, electionId: selectedElection._id })
        });
        const res = await response.json();
        console.log(res);
        handleIsopted();
    }


    return (
        <HoverDiv onClose={onClose} variant="voteBox">
            {({ handleClose }) => (
                <div className={styleVote.voteDiv}>
                    <FadeDiv fade_in={!isOpted} fade_out={isOpted} onChange={handleIsopted}>
                        {({ handleChange }) => (
                            <>
                                <p>
                                    "You have selected
                                    <span> '{selectedParty.name}' </span>
                                    from <br />
                                    <span> '{selectedParty.party}'. </span>
                                    Do you confirm your vote?"
                                </p>
                                <div className={styleVote.buttonsDiv}>
                                    <Button
                                        hover="danger"
                                        onClick={handleClose}
                                    >
                                        Back
                                    </Button>
                                    <Button onClick={handleVote} hover="success">Confirm</Button>
                                </div>
                            </>
                        )}
                    </FadeDiv>
                    <FadeDiv fade_in={isOpted} fade_out={!isOpted} onChange={handleIsopted}>
                        {({ handleChange }) => (
                            <>
                                <p>
                                    "Thank you for voting! Your vote has been successfully recorded." <br />
                                    ID: 123465798
                                </p>
                                <div className={styleVote.buttonsDiv}>
                                    <Link to="/userDashboard" replace>
                                        <Button onClick={handleVote} hover="success">Done</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </FadeDiv>
                </div>
            )}
        </HoverDiv>
    )
}
