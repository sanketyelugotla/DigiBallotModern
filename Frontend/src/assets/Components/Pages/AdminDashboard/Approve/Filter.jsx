import React, { useEffect, useRef, useState } from "react";
import styleApprove from "./Approve.module.css";
import { HoverDiv, Input } from "../../../../Hooks";
import { MdKeyboardArrowRight } from "react-icons/md";
import useElectionData from "../../../../Hooks/ContextProvider/useElectionData";

export default function Filter({ handleFilter }) {
    const [statusOpen, setStatusOpen] = useState(false);
    const [electionOpen, setElectionOpen] = useState(false);

    const { elections } = useElectionData();

    const statusTimeout = useRef(null);
    const electionTimeout = useRef(null);

    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedElections, setSelectedElections] = useState([]);

    const statusOptions = ["All", "Approved", "Pending", "Rejected"];

    useEffect(() => {
        console.log("Statuses:", selectedStatuses);
        console.log("Elections:", selectedElections);
    }, [selectedStatuses, selectedElections]);

    const handleFilterOpen = (setFn, timeoutRef) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setFn(true);
    };

    const handleFilterClose = (setFn, timeoutRef) => {
        timeoutRef.current = setTimeout(() => {
            setFn(false);
        }, 100);
    };

    const handleCheckboxToggle = (value, selected, setSelected) => {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    return (
        <HoverDiv.Mini
            onClose={handleFilter}
            insideDiv={styleApprove.filter}
            style={{ top: "23vh", left: "31vw", position: "absolute" }}
        >
            {({ handleClose }) => (
                <div className={styleApprove.mainFilter}>
                    {/* Status Filter */}
                    <div
                        className={`${styleApprove.indFilterWrapper} ${statusOpen ? styleApprove.highlight : ""}`}
                        onMouseEnter={() => handleFilterOpen(setStatusOpen, statusTimeout)}
                        onMouseLeave={() => handleFilterClose(setStatusOpen, statusTimeout)}
                    >
                        <div className={styleApprove.indFilter}>
                            <p>Status</p>
                            <MdKeyboardArrowRight className={styleApprove.icon} />
                        </div>
                        <div className={`${styleApprove.subMenu} ${statusOpen ? styleApprove.subMenuVisible : ""}`}>
                            {statusOptions.map(status => (
                                <Input.checkbox
                                    key={status}
                                    value={status}
                                    className={styleApprove.checkbox}
                                    size="medium"
                                    checked={selectedStatuses.includes(status)}
                                    onChange={(val) =>
                                        handleCheckboxToggle(val, selectedStatuses, setSelectedStatuses)
                                    }
                                >
                                    {status}
                                </Input.checkbox>
                            ))}
                        </div>
                    </div>

                    {/* Election Filter */}
                    <div
                        className={`${styleApprove.indFilterWrapper} ${electionOpen ? styleApprove.highlight : ""}`}
                        onMouseEnter={() => handleFilterOpen(setElectionOpen, electionTimeout)}
                        onMouseLeave={() => handleFilterClose(setElectionOpen, electionTimeout)}
                    >
                        <div className={styleApprove.indFilter}>
                            <p>Election</p>
                            <MdKeyboardArrowRight className={styleApprove.icon} />
                        </div>
                        <div className={`${styleApprove.subMenu} ${electionOpen ? styleApprove.subMenuVisible : ""}`}>
                            {elections?.map(election => (
                                <Input.checkbox
                                    key={election._id}
                                    value={election._id}
                                    className={styleApprove.checkbox}
                                    size="medium"
                                    checked={selectedElections.includes(election._id)}
                                    onChange={(val) =>
                                        handleCheckboxToggle(val, selectedElections, setSelectedElections)
                                    }
                                >
                                    {election.name}
                                </Input.checkbox>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </HoverDiv.Mini>
    );
}
