import React, { useContext, useEffect, useState } from 'react'
import { FadeDiv, Input, Button } from '../../../../Hooks/index'
import { sectionsContext } from "../CandidateProfile/SectionsContextProvider";
import styleForm from "../CandidateProfile/CandidateForm.module.css";
import { databaseContext, loadingContext } from '../../../../Hooks/ContextProvider/ContextProvider';
import PartyTable from './PartyTable';
import { toast } from 'react-toastify';

export default function Party({ completeData, fetchDetails }) {
    const { sections } = useContext(sectionsContext);
    const [elections, setElections] = useState([]);
    const { database_url } = useContext(databaseContext);
    const [selectedElection, setSelectedElection] = useState(null);
    const [selectedParty, setSelectedParty] = useState(null);
    const token = localStorage.getItem("authToken");
    const [parties, setParties] = useState([]);
    const { setLoading } = useContext(loadingContext)

    const getElections = async (e) => {
        setLoading(true);
        try {
            const response = await fetch(`${database_url}/election/all`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            if (res.success) {
                setElections(res.elections);
            } else {
                toast.warn(res.message);
                console.log(response);
            }
        } catch (error) {
            toast.error("Error fetching elections", error);
        } finally {
            setLoading(false);
        }
    };

    const getPaties = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${database_url}/party/election/${selectedElection._id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            if (res.success) {
                setParties(res.party);
            } else {
                toast.warn("Error fetching parties");
                console.error(response);
            }
        } catch (error) {
            toast.error("Error fetching parties");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getElections();
    }, [])

    useEffect(() => {
        selectedElection && getPaties();
    }, [selectedElection])

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${database_url}/candidates/register`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    electionId: selectedElection._id,
                    partyId: selectedParty._id
                }),
            });
            const res = await response.json();
            if (res.success) {
                fetchDetails();
                toast.success(res.message);
            }
            else toast.warn(res.message)
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <FadeDiv fade_in={sections === "party"} fade_out={sections !== "party"} className={styleForm.form} variant="form">
            <PartyTable completeData={completeData} />
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input.Dropdown
                        options={elections}
                        header="Select Election"
                        label="Select election"
                        setSelectedItem={setSelectedElection}
                    />
                </div>

                <div className={styleForm.inp}>
                    <Input.Dropdown
                        options={parties}
                        header="Select Party"
                        label="Select Party"
                        setSelectedItem={setSelectedParty}
                        defaultValue="No parties available"
                    />
                </div>
            </Input.Div>

            {/* File Upload */}
            {/* <Input.File title="Upload your party symbol here" label="Max photo size: 5MB" onFileSelect={handleFileSelect} /> */}
            <Button size="lg" className={styleForm.button} onClick={handleRegister}>Register for election</Button>

        </FadeDiv>
    )
}
