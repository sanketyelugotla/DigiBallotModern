import React from 'react'
import data from "../../../Data/Candidates"
import styleVote from "./Vote.module.css"
import Button from '../../Button/Button'

export default function Vote() {

    return (
        <div className={styleVote.full}>
            <table className={styleVote.table} border={1}>
                <tr className={styleVote.row}>
                    <th id={styleVote.col} className={styleVote.col}>Candidate Name</th>
                    <th id={styleVote.col} className={styleVote.col}>Party Name</th>
                    <th id={styleVote.col} className={styleVote.col}>Party Symbol</th>
                    <th id={styleVote.col} className={styleVote.col}></th>
                </tr>
                {data.map((item, key) => (
                    <tr className={styleVote.row}>
                        <td className={styleVote.col}>{item.name}</td>
                        <td className={styleVote.col}>{item.party}</td>
                        <td className={styleVote.col}>
                            <center><img src={item.img} alt="" /></center>
                        </td>
                        <td className={styleVote.col}>
                            <center><Button variant="light" radius="sharp">Select</Button></center>
                        </td>
                    </tr>
                ))}
            </table>
            <p className={styleVote.note}>**Double check your choice and make your vote count!</p>
            <Button variant="dark" id={styleVote.qwe}>Vote</Button>
        </div>
    )
}
