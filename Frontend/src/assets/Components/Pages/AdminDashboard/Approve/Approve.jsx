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

    const [isToggleAllActive, setIsToggleAllActive] = useState(false);

    function handleToggleAll() {
        setIsToggleAllActive(!isToggleAllActive);
        // toggleAll();
    }

    function handleTab() {
        setActive(!active);
    }

    function handleFilter() {
        setIsFilterOpen(!isFilterOpen);
    }

    const headings = ["User", "Candidate"];
    const content = [
        <UserSide setExportData={setExportData} setExportHeaders={setExportHeaders} active={active} isToggleAllActive={isToggleAllActive} />,
        <CandidateSide setExportData={setExportData} setExportHeaders={setExportHeaders} active={active} isToggleAllActive={isToggleAllActive} />
    ];

    const leftButtons =
        <div className={styleApprove.buttonsDiv}>
            <div ref={filterRef}><FaFilter className={styleApprove.link} onClick={handleFilter} /></div>
            <CSVLink data={exportData} headers={exportHeaders} filename='ExportData.csv'>
                <LuDownload className={styleApprove.buttonItem} />
            </CSVLink>
        </div>

    const rightButtons =
        <div className={styleApprove.buttonsDiv}>
            <div className={styleApprove.approveAll}>
                <ToggleButton isOn={isToggleAllActive} onToggle={handleToggleAll} />
                <p>Approve all</p>
            </div>
        </div>;


    return (
        <div>
            <HoverDiv onClose={handleApprove} insideDiv={styleApprove.main}>
                {({ handleClose }) => (
                    <div className={styleApprove.box}>
                        {/* SlideBar for switching between User & Candidate */}
                        <SlideBar headings={headings} content={content} onTabChange={handleTab} rightButtons={rightButtons} leftButtons={leftButtons} />
                    </div>
                )}
            </HoverDiv>
            {isFilterOpen && <Filter handleFilter={handleFilter} filterPosition={filterRef} />}
        </div>
    );
}
