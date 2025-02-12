import React, { useState } from 'react'
import styleNav from "./Leftnav.module.css"
import { ImProfile } from "react-icons/im";
import { FaRegAddressCard } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

export default function LeftNav() {
    const [sections, setSections] = useState("personel")

    function handleClick(event) {
        const { id } = event.target;
        setSections(id);
        console.log(sections)
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
            <p id='party'
                className={`${styleNav.para} ${sections === "party" && styleNav.highlight}`}
                onClick={handleClick}
            >
                <FaRegAddressCard className={styleNav.icon} />
                Party Information
            </p>
            <p id='other'
                className={`${styleNav.para} ${sections === "other" && styleNav.highlight}`}
                onClick={handleClick}
            >
                <TbListDetails className={styleNav.icon} />
                Other details
            </p>
        </div>
    )
}
