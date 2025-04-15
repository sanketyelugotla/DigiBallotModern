import React, { useContext, useEffect, useRef, useState } from "react";
import styleApprove from "./Approve.module.css";
import { HoverDiv, Input } from "../../../../Hooks";
import { MdKeyboardArrowRight } from "react-icons/md";
import useElectionData from "../../../../Hooks/ContextProvider/useElectionData";
import { SelectedElectionContext, SelectedStatusContext } from "../../../../Hooks/ContextProvider/FilterContext";

export default function Filter({ handleFilter, position }) {
    const [statusOpen, setStatusOpen] = useState(false);
    const [electionOpen, setElectionOpen] = useState(false);

    const { elections } = useElectionData();

    const statusTimeout = useRef(null);
    const electionTimeout = useRef(null);

    const { selectedStatuses, setSelectedStatuses } = useContext(SelectedStatusContext);
    const { selectedElections, setSelectedElections } = useContext(SelectedElectionContext);

    const statusOptions = ["All", "approved", "pending", "rejected"];
    const electionOptions = elections ? [{ _id: "all", name: "All" }, ...elections] : [];

    const handleFilterOpen = (setFn, timeoutRef) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setFn(true);
    };

    const handleFilterClose = (setFn, timeoutRef) => {
        timeoutRef.current = setTimeout(() => {
            setFn(false);
        }, 100);
    };

    const handleCheckboxToggle = (value, selected, setSelected, isElection = false) => {
        if (value === "all" || value === "All") {
            // Toggle "All" selection
            if (selected.includes("all") || selected.includes("All")) {
                setSelected([]);
            } else {
                if (isElection) {
                    setSelected(elections ? ["all", ...elections.map(e => e._id)] : ["all"]);
                } else {
                    setSelected(["All", "approved", "pending", "rejected"]);
                }
            }
            return;
        }

        setSelected(prev => {
            // Remove "all" if any other option is selected
            let newSelected = [...prev];
            if (isElection && newSelected.includes("all")) {
                newSelected = newSelected.filter(v => v !== "all");
            } else if (!isElection && newSelected.includes("All")) {
                newSelected = newSelected.filter(v => v !== "All");
            }

            // Toggle the current selection
            return newSelected.includes(value)
                ? newSelected.filter(v => v !== value)
                : [...newSelected, value];
        });
    };

    const isAllSelected = (selected, isElection = false) => {
        if (isElection) {
            return elections
                ? selected.length === elections.length + 1 && selected.includes("all")
                : selected.includes("all");
        }
        return selected.length === 4 && selected.includes("All");
    };

    return (
        <HoverDiv.Mini
            onClose={handleFilter}
            insideDiv={styleApprove.filter}
            style={{
                top: `${position?.top || "18vh"}`,
                left: `${position?.left || "31vw"}`,
                position: "absolute"
            }}
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
                                    variant="blue"
                                    checked={selectedStatuses.includes(status) || isAllSelected(selectedStatuses)}
                                    onChange={(val) => handleCheckboxToggle(val, selectedStatuses, setSelectedStatuses)}
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
                            {electionOptions.map(election => (
                                <Input.checkbox
                                    key={election._id}
                                    value={election._id}
                                    className={styleApprove.checkbox}
                                    size="medium"
                                    variant="blue"
                                    checked={selectedElections.includes(election._id) || isAllSelected(selectedElections, true)}
                                    onChange={(val) => handleCheckboxToggle(val, selectedElections, setSelectedElections, true)}
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