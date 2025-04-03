import React, { useContext, useEffect, useState } from 'react'
import { databaseContext, electionDetails, loadingContext } from '../../../Hooks/ContextProvider/ContextProvider'
import styleVote from "./Vote.module.css"
import { Button, HoverDiv } from '../../../Hooks';

import styleElection from "./Election.module.css"
import { useNavigate } from 'react-router-dom';

export default function Election() {
    const { database_url } = useContext(databaseContext);
    const [elections, setElections] = useState();
    const { selectedElection, setSelectedElection } = useContext(electionDetails);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const token = localStorage.getItem("authToken");
    const { setLoading } = useContext(loadingContext)

    function onClose() {
        setIsConfirmOpen(!isConfirmOpen);
    }

    async function fetchElections() {
        try {
            setLoading(true);
            const response = await fetch(`${database_url}/election`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            setElections(res.elections);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setSelectedElection([]);
        fetchElections();
    }, [])

    function selectButton(item) {
        if (selectedElection.name != item.name) setSelectedElection(item)
        else setSelectedElection("");
    }

    const navigate = useNavigate();
    function handleClick() {
        if (!selectedElection) alert("Please select an election to proceed");
        else onClose();
    }

    function handleChange() {
        navigate("/userDashboard/vote")
    }

    return (
        <div className={styleElection.main}>
            <h2>Active Elections</h2>
            <table className={styleVote.table} id={styleElection.table} border={1}>
                <thead>
                    <tr className={styleVote.row}>
                        <th id={styleVote.col} className={styleVote.col}>Election Name</th>
                        <th id={styleVote.col} className={styleVote.col}></th>
                    </tr>
                </thead>
                <tbody>
                    {elections && elections.map((item) => {
                        return (
                            <tr className={styleVote.row} key={item.name}>
                                <td className={styleVote.col}>{item.name}</td>
                                <td className={styleVote.col}>
                                    <center>
                                        <Button
                                            variant="light"
                                            radius="sharp"
                                            name={item.partyId}
                                            onClick={(event) => selectButton(item)}
                                            active={selectedElection.name === item?.name}
                                        >
                                            {selectedElection.name === item?.name ? "Deselect" : "Select"}
                                        </Button>
                                    </center>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Button onClick={handleClick}>Proceed</Button>
            {isConfirmOpen &&
                <HoverDiv onClose={onClose} variant="voteBox">
                    {({ handleClose }) => (
                        <div className={styleVote.voteDiv}>
                            <p>
                                "You have selected
                                <span> '{selectedElection.name}' </span> <br />
                                Do you confirm your selection?"
                            </p>
                            <div className={styleVote.buttonsDiv}>
                                <Button onClick={handleChange} hover="success">Confirm</Button>
                            </div>
                        </div>
                    )}
                </HoverDiv>
            }
        </div>
    )
}
