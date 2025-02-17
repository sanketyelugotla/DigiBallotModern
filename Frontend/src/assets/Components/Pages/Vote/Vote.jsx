import React, { useContext, useState } from 'react'
import data from "../../../Data/Candidates"
import styleVote from "./Vote.module.css"
import { Button } from '../../../Hooks/index'
import { partiesContext } from '../../../Hooks/ContextProvider/ContextProvider'
import ConfirmVote from './ConfirmVote'

export default function Vote() {
    const { selectedParty, setSelectedParty } = useContext(partiesContext);
    const [isOpen, setIsOpen] = useState(false);
    function selectButton(event, item) {
        const { name } = event.target;
        if (selectedParty.name != name)
            setSelectedParty({ name: item.name, party: name });
        else setSelectedParty("");
    }

    function handleVote() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styleVote.full}>
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
                    {data.map((item, key) => (
                        <tr className={styleVote.row} key={item.party}>
                            <td className={styleVote.col}>{item.name}</td>
                            <td className={styleVote.col}>{item.party}</td>
                            <td className={styleVote.col}>
                                <center><img src={item.party_img} alt="" /></center>
                            </td>
                            <td className={styleVote.col}>
                                <center>
                                    <Button
                                        variant="light"
                                        radius="sharp"
                                        name={item.party}
                                        onClick={(event) => selectButton(event, item)}
                                        active={selectedParty.party === item.party}
                                    >
                                        {selectedParty.party === item.party ? "Deselect" : " Select "}
                                    </Button>
                                </center>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isOpen &&
                <ConfirmVote onClose={handleVote} />
            }
            <p className={styleVote.note}>**Double check your choice and make your vote count!</p>
            <Button
                variant="dark"
                id={styleVote.qwe}
                onClick={handleVote}
            >
                Vote
            </Button>
        </div>
    )
}
