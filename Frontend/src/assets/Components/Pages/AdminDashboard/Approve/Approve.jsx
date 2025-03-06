import React, { useContext, useState } from 'react'
import { HoverDiv, SlideBar } from '../../../../Hooks'
import { databaseContext, userContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import styleApprove from "./Approve.module.css"
import UserSide from './UserSide';
import CandidateSide from './CandidateSide';

export default function Approve({ handleApprove }) {
    const [isLeft, setIsLeft] = useState(true);

    function changeSide(side) {
        setIsLeft(side);
    }

    const headings = ["User", "Candidate"];
    const content = [
        <UserSide />,
        <CandidateSide />
    ];

    return (
        <HoverDiv onClose={handleApprove} insideDiv={styleApprove.main}>
            {({ handleClose }) => (
                <div className={styleApprove.box}>
                    <SlideBar headings={headings} content={content} />
                </div>
            )}
        </HoverDiv>
    )
}
