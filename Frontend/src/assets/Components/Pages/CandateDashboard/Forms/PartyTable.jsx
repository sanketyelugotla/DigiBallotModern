import React from 'react'
import styleForm from "../CandidateProfile/CandidateForm.module.css";


export default function PartyTable({ completeData }) {
    return completeData && completeData.elections.length > 0 && (
        <div id={styleForm.wholeTable}>
            <h2 className={styleForm.heading}>Regestered Elections</h2>
            <table id={styleForm.table}>
                <thead>
                    <tr>
                        <th>Election</th>
                        <th>Party</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {completeData.elections.map((election, index) => (
                        <tr key={index} id={styleForm.entry}>
                            <td>{election._id.name}</td>
                            <td>{election.partyId.partyName}</td>
                            <td>{election.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
