import React, { useContext, useState } from 'react'
import { HoverDiv, FadeDiv, Button, SlideBar } from '../../../../Hooks'
import { databaseContext, userContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import styleApprove from "./Approve.module.css"
import UserSide from './UserSide';
import CandidateSide from './CandidateSide';

export default function Approve({ handleApprove }) {
    const [isLeft, setIsLeft] = useState(true);

    function changeSide(side) {
        setIsLeft(side);
    }

    return (
        <HoverDiv onClose={handleApprove} insideDiv={styleApprove.main}>
            {({ handleClose }) => (
                <div className={styleApprove.box}>
                    {/* <div className={styleApprove.buttons}>
                        <div
                            className={`${styleApprove.slider} ${isLeft ? styleApprove.left : styleApprove.right}`}
                            // style={{ transform: isLeft ? "translateX(-60%)" : "translateX(60%)" }}
                        />
                        <Button
                            className={`${styleApprove.button} ${isLeft ? styleApprove.selected : ""}`}
                            onClick={() => changeSide(true)}
                        >
                            User
                        </Button>
                        <Button
                            className={`${styleApprove.button} ${!isLeft ? styleApprove.selected : ""}`}
                            onClick={() => changeSide(false)}
                        >
                            Candidate
                        </Button>
                    </div>
                    <div className={styleApprove.voteDiv}>
                        <FadeDiv fade_in={isLeft} fade_out={!isLeft} onChange={() => changeSide(true)}>
                            {({ handleChange }) => (
                                <UserSide />
                            )}
                        </FadeDiv>
                        <FadeDiv fade_in={!isLeft} fade_out={isLeft} onChange={() => changeSide(false)}>
                            {({ handleChange }) => (
                                <CandidateSide />
                            )}
                        </FadeDiv>
                    </div> */}
                    <SlideBar />
                </div>
            )}
        </HoverDiv>
    )
}
