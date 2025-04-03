import React, { useContext } from 'react';
import { Button } from "../../../Hooks/index";
import styleVote from "./Vote.module.css";
import { databaseContext } from '../../../Hooks/ContextProvider/ContextProvider';

export default function VotingTable({ data, selectButton, selectedParty }) {
    const { database_url } = useContext(databaseContext);
    return (
        <table className={styleVote.table} border={1}>
            <thead>
                <tr className={styleVote.row}>
                    <th id={styleVote.col} className={styleVote.col}>Candidate Name</th>
                    <th id={styleVote.col} className={styleVote.col}>Party Name</th>
                    <th id={styleVote.col} className={styleVote.col}>Party Symbol</th>
                    <th id={styleVote.col} className={styleVote.col}></th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((item) => {
                    return (
                        <tr className={styleVote.row} key={item.election.partyId._id}>
                            <td className={styleVote.col}>{item.fullName}</td>
                            <td className={styleVote.col}>{item.election.partyId.partyName}</td>
                            <td className={styleVote.col}>
                                <center>
                                    <img src={`${database_url}/image/party/image/${item.election.partyId._id}`} alt="Party Symbol" />
                                </center>
                            </td>
                            <td className={styleVote.col}>
                                <center>
                                    <Button
                                        variant="light"
                                        radius="sharp"
                                        name={item.partyId}
                                        onClick={(event) => selectButton(event, item)}
                                        active={selectedParty.party === item.election.partyId.partyName}
                                    >
                                        {selectedParty.party === item.election.partyId.partyName ? "Deselect" : "Select"}
                                    </Button>
                                </center>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
