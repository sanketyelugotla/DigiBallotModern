import React, { useRef, useState } from 'react';
import { HoverDiv, SlideBar, ToggleButton } from '../../../../Hooks';
import { CSVLink } from "react-csv";
import styleApprove from "./Approve.module.css";
import UserSide from './UserSide';
import CandidateSide from './CandidateSide';
import Filter from './Filter';
import { LuDownload } from "react-icons/lu";
import { FaFilter } from "react-icons/fa";

export default function Approve({ handleApprove }) {
    const [exportData, setExportData] = useState([]);
    const [exportHeaders, setExportHeaders] = useState([]);
    const [active, setActive] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);
    const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

    function handleTab() {
        setActive(!active);
    }

    function handleFilter() {
        setIsFilterOpen(!isFilterOpen);
        if (filterRef.current) {
            const rect1 = trailRef.current.getBoundingClientRect();
            const rect = filterRef.current.getBoundingClientRect();
            console.log(rect)
            setFilterPosition({
                top: rect1.top - rect.bottom + 10, // Below the username
                left: 1317 - rect.right, // Align with the username
            });
        }
    }

    const headings = ["User", "Candidate"];
    const content = [
        <UserSide setExportData={setExportData} setExportHeaders={setExportHeaders} active={active} />,
        <CandidateSide setExportData={setExportData} setExportHeaders={setExportHeaders} active={active} />
    ];
    const buttons =
        <div className={styleApprove.buttonsDiv}>
            <div ref={filterRef}><FaFilter className={styleApprove.link} onClick={handleFilter} /></div>
            <CSVLink data={exportData} headers={exportHeaders} filename='ExportData.csv'>
                <LuDownload className={styleApprove.buttonItem} />
            </CSVLink>
            <div className={styleApprove.approveAll}>
                <ToggleButton />
                <p>Approve all</p>
            </div>
        </div>;

    const trailRef = useRef(null);
    trailRef && trailRef.current && console.log("Hover" + trailRef);

    return (
        <div ref={trailRef}>
            <HoverDiv onClose={handleApprove} insideDiv={styleApprove.main}>
                {({ handleClose }) => (
                    <div className={styleApprove.box}>
                        {/* SlideBar for switching between User & Candidate */}
                        <SlideBar headings={headings} content={content} onTabChange={handleTab} buttons={buttons} />
                    </div>
                )}
            </HoverDiv>
            {isFilterOpen && <Filter handleFilter={handleFilter} filterPosition={filterPosition} />}
        </div>
    );
}
