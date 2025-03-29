import React from "react";
import styleApprove from "./Approve.module.css";
import { HoverDiv } from "../../../../Hooks";

export default function Filter({ handleFilter, filterPosition }) {
  console.log(filterPosition);
// style={{ top: `${filterPosition.top}px`, left: `${filterPosition.left}px`, position: "absolute" }}
  return (
    <HoverDiv.Mini onClose={handleFilter} insideDiv={styleApprove.filter} style={{ position: "absolute", top: "0px", left: "0" }}>
      {({ handleClose }) => <p>Hello</p>}
    </HoverDiv.Mini>
  );
}
