import React, { useState } from 'react'
import HoverDiv from '../../HoverDiv/HoverDiv'
import styleVote from "./Vote.module.css"
import Button from '../../Button/Button'
import FadeDiv from '../../FadeDiv/FadeDiv'

export default function ConfirmVote({ onClose }) {
    const [isOpted, setIsopted] = useState(false);
    function handleIsopted() {
        setIsopted(!isOpted);
    }

    return (
        <HoverDiv onClose={onClose} variant="voteBox">
            {({ handleClose }) => (
                <div className={styleVote.voteDiv}>
                    {!isOpted &&
                        <FadeDiv fade_out={isOpted} onChange={handleIsopted}>
                            {({ handleChange }) => (
                                <>
                                    <p>
                                        "You have selected
                                        <span> 'Sanket Yelugotla' </span>
                                        from
                                        <span> 'Janasena party'. </span>
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
                        </FadeDiv>}
                    {isOpted &&
                        <FadeDiv fade_in={isOpted} fade_out={!isOpted} onChange={handleIsopted}>
                            {({ handleChange }) => (
                                <>
                                    <p>
                                        "Thank you for voting! Your vote has been successfully recorded." <br />
                                        ID: 123465798
                                    </p>
                                    <div className={styleVote.buttonsDiv}>
                                        <Button onClick={handleChange} hover="success">Done</Button>
                                    </div>
                                </>
                            )}
                        </FadeDiv>}
                </div>
            )}
        </HoverDiv>
    )
}
