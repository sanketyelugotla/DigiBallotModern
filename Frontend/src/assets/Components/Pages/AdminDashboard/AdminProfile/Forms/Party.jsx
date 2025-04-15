import React, { useContext, useEffect, useState } from 'react'
import { FadeDiv, Input, Button } from '../../../../../Hooks';
import styleForm from "../AdminForm.module.css";
import { databaseContext, loadingContext } from '../../../../../Hooks/ContextProvider/ContextProvider';
import { sectionsContext } from '../SectionsContextProvider';
import { toast } from 'react-toastify';

export default function Party() {
    const [elections, setElections] = useState([]);
    const { database_url } = useContext(databaseContext);
    const [selectedElection, setSelectedElection] = useState(null);
    const { sections, setSections } = useContext(sectionsContext);
    const [party, setParty] = useState({
        partyName: "",
        partyImage: "",
        state: ""
    });
    const { setLoading } = useContext(loadingContext);

    const getElections = async (e) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/election/elections`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            if (res.success) {
                setElections(res.elections);
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getElections();
    }, [])

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setParty((prev) => ({ ...prev, [name]: value }));
    };

    function changeToElection() {
        setSections("election");
    }

    const handleFileSelect = (file, name) => {
        setParty((prev) => ({ ...prev, [name]: file }));
    };

    async function createParty(e) {
        setLoading(true);
        e.preventDefault();
        const formDataObj = new FormData();

        Object.keys(party).forEach((key) => {
            if (party[key]) {
                formDataObj.append(key, party[key]);
            }
        });
        console.log(selectedElection)
        formDataObj.append("adminId", selectedElection.adminId);
        formDataObj.append("electionId", selectedElection._id);

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/party/addParty`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formDataObj,
            });
            const res = await response.json();
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <FadeDiv fade_in={sections === "party"} fade_out={sections !== "party"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input.Dropdown
                        options={elections}
                        header="Select Election"
                        label="Select election"
                        button="Create Election"
                        action={changeToElection}
                        setSelectedItem={setSelectedElection}
                    />
                    <Input type="text" label="Party Name" name="partyName" value={party.partyName} onChange={handleFormChange} />
                </div>

                <div className={styleForm.inp}>
                    <Input type="text" label="State" name="state" value={party.state} onChange={handleFormChange} />
                </div>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your party symbol here" label="Max photo size: 5MB" onFileSelect={handleFileSelect} name="partyImage" />
            <Button onClick={createParty}>Create Party</Button>
        </FadeDiv>
    )
}
