import React, { useContext, useState } from 'react'
import styleNav from "./Leftnav.module.css"
import { ImProfile } from "react-icons/im";
import { FaRegAddressCard } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { sectionsContext } from '../SectionsContextProvider';
import { CiCircleCheck } from "react-icons/ci";

export default function LeftNav({ handleSelectionChange }) {
    const { sections, setSections } = useContext(sectionsContext);

    function handleClick(event) {
        const { id } = event.target;
        setSections(id);
    }

    return (
        <div className={styleNav.full}>
            <p id='personel'
                className={`${styleNav.para} ${sections === "personel" && styleNav.highlight}`}
                onClick={handleClick}
            >
                <ImProfile className={styleNav.icon} />
                Personel Information
            </p>
            <p id='election'
                className={`${styleNav.para} ${sections === "election" && styleNav.highlight}`}
                onClick={handleClick}
            >
                <FaRegAddressCard className={styleNav.icon} />
                Create Election
            </p>
            <p id='party'
                className={`${styleNav.para} ${sections === "party" && styleNav.highlight}`}
                onClick={handleClick}
            >
                <TbListDetails className={styleNav.icon} />
                Create Party
            </p>
        </div>
    )
}
