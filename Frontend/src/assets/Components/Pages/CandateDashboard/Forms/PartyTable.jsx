import React from 'react'
import styles from "../../AdminDashboard/Approve/Approve.module.css"
import styleForm from "../CandidateProfile/CandidateForm.module.css";


export default function PartyTable({ completeData }) {
    return (
        <div className={styles.wholeTable} id={styleForm.wholeTable}>
            <h2 className={styleForm.heading}>Regestered Elections</h2>
            {completeData && completeData.elections && (
                <table className={styles.tableDiv} id={styleForm.table}>
                    <thead>
                        <tr>
                            <th>Election</th>
                            <th>Party</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completeData.elections.map((election, index) => (
                            <tr key={index} className={styles.entry} id={styleForm.entry}>
                                <td>{election._id.name}</td>
                                <td>{election.partyId.partyName}</td>
                                <td>{election.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
