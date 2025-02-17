import React, { useContext, useEffect, useState } from 'react';
import styleVote from "./Vote.module.css";
import { Button } from "../../../Hooks/index";
import { databaseContext } from '../../../Hooks/ContextProvider/ContextProvider';

export default function VotingTable({ data, selectButton, selectedParty }) {
    const { database_url } = useContext(databaseContext);
    const [parties, setParties] = useState({});

    useEffect(() => {
        async function fetchAllParties() {
            const partyData = {};
            await Promise.all(data.map(async (item) => {
                if (!item.partyId) return;
                try {
                    const response = await fetch(`${database_url}/party/${item.partyId}`);
                    const res = await response.json();
                    partyData[item.partyId] = res; // Store party data by partyId
                } catch (error) {
                    console.error("Error fetching party:", error);
                }
            }));
            setParties(partyData);
        }

        fetchAllParties();
    }, [data, database_url]);

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
                    const party = parties[item.partyId];

                    return (
                        <tr className={styleVote.row} key={item.partyId}>
                            <td className={styleVote.col}>{item.fullName}</td>
                            <td className={styleVote.col}>{party ? party.partyName : "Loading..."}</td>
                            <td className={styleVote.col}>
                                <center>
                                    {party ? (
                                        <img src={`${database_url}/party/image/${party._id}`} alt="Party Symbol" />
                                    ) : "Loading..."}
                                </center>
                            </td>
                            <td className={styleVote.col}>
                                <center>
                                    <Button
                                        variant="light"
                                        radius="sharp"
                                        name={item.partyId}
                                        onClick={(event) => selectButton(event, item, party)}
                                        active={selectedParty.party === party?.partyName}
                                    >
                                        {selectedParty.party === party?.partyName ? "Deselect" : "Select"}
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
