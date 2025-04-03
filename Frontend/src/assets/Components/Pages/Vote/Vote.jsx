import React, { useContext, useEffect, useState } from 'react'
import styleVote from "./Vote.module.css"
import { Button } from '../../../Hooks/index'
import { partiesContext, databaseContext, electionDetails } from '../../../Hooks/ContextProvider/ContextProvider'
import ConfirmVote from './ConfirmVote'
import VotingTable from './VotingTable'

export default function Vote() {
    const { selectedParty, setSelectedParty } = useContext(partiesContext);
    const [isOpen, setIsOpen] = useState(false);
    const [candidateDetails, setCandidateDetails] = useState();
    const { database_url } = useContext(databaseContext);
    const { selectedElection } = useContext(electionDetails);
    const token = localStorage.getItem("authToken");

    async function fetchCandidates() {
        const response = await fetch(`${database_url}/candidates/${selectedElection._id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const res = await response.json();
        setCandidateDetails(res);
    }

    useEffect(() => {
        setSelectedParty([]);
        fetchCandidates();
    }, [databaseContext])

    function selectButton(event, item) {
        const { fullName } = event.target;
        const { partyName, _id } = item.election.partyId
        if (selectedParty.name != item.fullName) setSelectedParty({ name: item.fullName, candidateId: item._id, party: partyName, partyId: _id });
        else setSelectedParty("");
    }

    function handleVote() {
        if (!selectedParty) {
            alert("Please select a party to procees")
            return;
        }
        setIsOpen(!isOpen);
    }

    return (
        <div className={styleVote.full}>
            <VotingTable
                data={candidateDetails}
                selectButton={selectButton}
                selectedParty={selectedParty}
            />
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
