import React, { useContext, useEffect, useState } from 'react'
import { FadeDiv, Input, Button } from '../../../../Hooks/index'
import { sectionsContext } from "../CandidateProfile/SectionsContextProvider";
import styleForm from "../CandidateProfile/CandidateForm.module.css";
import { databaseContext } from '../../../../Hooks/ContextProvider/ContextProvider';

export default function Party({ handleFileSelect, handleFormChange, formData }) {
    const { sections } = useContext(sectionsContext);
    const [elections, setElections] = useState([]);
    const { database_url } = useContext(databaseContext);
    const [selectedElection, setSelectedElection] = useState(null);
    const [selectedParty, setSelectedParty] = useState(null);
    const token = localStorage.getItem("authToken");
    const [parties, setParties] = useState([]);

    const getElections = async (e) => {
        try {
            const response = await fetch(`${database_url}/election/all`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const res = await response.json();
                setElections(res);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const getPaties = async () => {
        try {
            const response = await fetch(`${database_url}/party/election/${selectedElection._id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const res = await response.json();
                setParties(res);
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    useEffect(() => {
        getElections();
    }, [])

    useEffect(() => {
        selectedElection && getPaties();
    }, [selectedElection])

    return (
        <FadeDiv fade_in={sections === "party"} fade_out={sections !== "party"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input.Dropdown
                        options={elections}
                        header="Select Election"
                        label="Select election"
                        setSelectedItem={setSelectedElection}
                    />
                    {/* <Input type="text" label="Party Name" name="partyName" value={formData.partyName} onChange={handleFormChange} /> */}
                    <Input.Dropdown
                        options={parties}
                        header="Select Party"
                        label="Select Party"
                        setSelectedItem={setSelectedParty}
                    />
                </div>

                <div className={styleForm.inp}>
                    <Input type="text" label="State" name="state" value={formData.state} onChange={handleFormChange} />
                </div>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your party symbol here" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />
            <Button size="lg">Register for election</Button>
        </FadeDiv>
    )
}
