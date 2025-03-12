import React, { useState } from 'react';
import { HoverDiv, SlideBar } from '../../../../Hooks';
import { CSVLink } from "react-csv";
import styleApprove from "./Approve.module.css";
import UserSide from './UserSide';
import CandidateSide from './CandidateSide';
import { LuDownload } from "react-icons/lu";

export default function Approve({ handleApprove }) {
    const [exportData, setExportData] = useState([]);
    const [exportHeaders, setExportHeaders] = useState([]);
    const [active, setActive] = useState(false);

    function handleTab() {
        setActive(!active);
    }

    const headings = ["User", "Candidate"];
    const content = [
        <UserSide setExportData={setExportData} setExportHeaders={setExportHeaders} active={active} />,
        <CandidateSide setExportData={setExportData} setExportHeaders={setExportHeaders} active={active} />
    ];

    return (
        <HoverDiv onClose={handleApprove} insideDiv={styleApprove.main}>
            {({ handleClose }) => (
                <div className={styleApprove.box}>
                    {/* CSV Export Button */}
                    <CSVLink data={exportData} headers={exportHeaders} filename='ExportData.csv'>
                        <LuDownload />
                    </CSVLink>

                    {/* SlideBar for switching between User & Candidate */}
                    <SlideBar headings={headings} content={content} onTabChange={handleTab} />
                </div>
            )}
        </HoverDiv>
    );
}
