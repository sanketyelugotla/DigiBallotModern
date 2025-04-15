import React, { useState } from 'react'
import styleVote from "../Vote/Vote.module.css"
import { Button } from "../../../Hooks/index"

export default function CandidateTable({ selectedData }) {

    function calculate_age(dobString) {
        var dob = new Date(dobString);

        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    return (
        <div className="selected-info">
            <h2>{selectedData.fullName}</h2>
            <table className={styleVote.table} id="tab">
                <thead>
                    <tr className={styleVote.row}>
                        <th id={styleVote.col} className={styleVote.col} colSpan="2">Personal Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>Party</td>
                        <td className={styleVote.col}>{selectedData.election.partyId.partyName}</td>
                    </tr>
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>S/O | D/O | W/O</td>
                        <td className={styleVote.col}>{selectedData.spouse}</td>
                    </tr>
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>Age</td>
                        <td className={styleVote.col}>{calculate_age(selectedData.dob)}</td>
                    </tr>
                    {/* <tr className={styleVote.row}>
                        <td className={styleVote.col}>Name in voter enrolment</td>
                        <td className={styleVote.col}>{selectedData.details.name_voter}</td>
                    </tr> */}
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>Self Profession</td>
                        <td className={styleVote.col}>{selectedData.self_profession}</td>
                    </tr>
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>Spouse Profession</td>
                        <td className={styleVote.col}>{selectedData.spouse_profession}</td>
                    </tr>
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>Assets</td>
                        <td className={styleVote.col}>{selectedData.assets}</td>
                    </tr>
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>Liabilities</td>
                        <td className={styleVote.col}>{selectedData.liabilities}</td>
                    </tr>
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>Education</td>
                        <td className={styleVote.col}>{selectedData.education}</td>
                    </tr>
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>Manifesto</td>
                        <td className={styleVote.col}>
                            <center><a href={selectedData.manifesto} target="__blank"><Button>Download</Button></a></center>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
