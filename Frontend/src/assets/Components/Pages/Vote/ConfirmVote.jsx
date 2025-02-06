import React, { useContext, useState } from 'react'
import HoverDiv from '../../HoverDiv/HoverDiv'
import styleVote from "./Vote.module.css"
import Button from '../../Button/Button'
import FadeDiv from '../../FadeDiv/FadeDiv'
import { Link } from 'react-router-dom'
import { partiesContext } from '../../ContextProvider/ContextProvider'

export default function ConfirmVote({ onClose }) {
    const { selectedParty } = useContext(partiesContext);
    const [isOpted, setIsopted] = useState(false);
    function handleIsopted() {
        setIsopted(!isOpted);
    }

    return (
        <HoverDiv onClose={onClose} variant="voteBox">
            {({ handleClose }) => (
                <div className={styleVote.voteDiv}>
                    <FadeDiv fade_out={isOpted} onChange={handleIsopted}>
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
                                    <Button onClick={handleChange} hover="success">Confirm</Button>
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
                                        <Button onClick={handleChange} hover="success">Done</Button>
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
