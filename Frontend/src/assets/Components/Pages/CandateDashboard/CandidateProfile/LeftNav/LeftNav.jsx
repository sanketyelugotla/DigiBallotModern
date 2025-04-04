import React, { useContext } from 'react';
import { FaRegAddressCard } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { TbListDetails } from "react-icons/tb";
import { sectionsContext } from '../SectionsContextProvider';
import styleNav from "./Leftnav.module.css";

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
            {/* <p id='declaration'
                className={`${styleNav.para} ${sections === "declaration" && styleNav.highlight}`}
                onClick={handleClick}
            >
                <CiCircleCheck className={styleNav.icon} />
                Declaration
            </p> */}
        </div>
    )
}
