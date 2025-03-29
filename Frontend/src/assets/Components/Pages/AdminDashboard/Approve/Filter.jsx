import React from "react";
import styleApprove from "./Approve.module.css";
import { HoverDiv } from "../../../../Hooks";

export default function Filter({ handleFilter, filterPosition }) {
    let rect;
    if (filterPosition.current) {
        rect = filterPosition.current.getBoundingClientRect();
    }
    console.log(rect)
    // style = {{ top: `${filterPosition.top}px`, left: `${filterPosition.left}px`, position: "absolute" }}

    return (
        <HoverDiv.Mini onClose={handleFilter} insideDiv={styleApprove.filter} style={{ top: "23vh", left: "30vw", position: "absolute" }}>
            {({ handleClose }) => <p>Hello</p>}
        </HoverDiv.Mini>
    );
}
