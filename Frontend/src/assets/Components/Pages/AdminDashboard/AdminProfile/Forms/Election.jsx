import React, { useContext, useState } from 'react'
import { FadeDiv, Input, Button } from '../../../../../Hooks';
import { sectionsContext } from '../SectionsContextProvider';
import styleForm from "../AdminForm.module.css";
import { databaseContext } from '../../../../../Hooks/ContextProvider/ContextProvider';

export default function Other() {
    const { sections } = useContext(sectionsContext)
    const { database_url } = useContext(databaseContext)

    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        pic: ""
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleFileSelect = (file, name) => {
        console.log(file)
        console.log(name)
        setFormData((prev) => ({ ...prev, [name]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                formDataObj.append(key, formData[key]); // Append all fields dynamically
            }
        });


        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/addElection`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }, // Ensure Bearer token
                body: formDataObj, // FormData automatically sets Content-Type
            });

            if (response.ok) {
                alert("Election created successfully!");
            } else {
                alert("Submission failed!");
                console.log(response);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <FadeDiv fade_in={sections === "election"} fade_out={sections !== "election"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input type="text" label="Election Name" name="name" value={formData.electionName} onChange={handleFormChange} />
                </div>
                <div className={styleForm.inp}>
                    <Input type="date" label="Start date" name="startDate" onChange={handleFormChange} />
                    <Input type="date" label="End date" name="endDate" onChange={handleFormChange} />
                </div>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your election symbol here" label="Max photo size: 5MB" onFileSelect={handleFileSelect} name="pic" />
            <Button onClick={handleSubmit}>Create</Button>
        </FadeDiv >
    )
}
