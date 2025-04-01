import React, { useContext, useState } from 'react'
import { FadeDiv, Input, Button } from '../../../../../Hooks';
import { sectionsContext } from '../SectionsContextProvider';
import styleForm from "../AdminForm.module.css";
import { databaseContext } from '../../../../../Hooks/ContextProvider/ContextProvider';

export default function Personel() {
    const { database_url } = useContext(databaseContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        password: "",
        dob: "",
        gender: "",
        otp: "",
        image: ""
    });

    const handleFileSelect = (file, name) => {
        setFormData((prev) => ({ ...prev, [name]: file }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                formDataObj.append(key, formData[key]); // Append all fields dynamically
            }
        });

        console.log("Sending FormData:", [...formDataObj.entries()]);

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/update`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }, // Ensure Bearer token
                body: formDataObj, // FormData automatically sets Content-Type
            });

            if (response.ok) {
                alert("Details updated successfully!");
            } else {
                alert("Submission failed!");
                console.log(response);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const { sections } = useContext(sectionsContext)
    return (
        <FadeDiv fade_in={sections === "personel"} fade_out={sections !== "personel"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input type="text" label="Full Name" name="name" value={formData.name} onChange={handleFormChange} />
                    <Input type="email" label="Email" name="email" value={formData.email} onChange={handleFormChange} />
                    <Input type="number" label="Mobile Number" name="number" value={formData.number} onChange={handleFormChange} />
                    <Input type="password" label="Password" name="password" value={formData.password} onChange={handleFormChange} />
                </div>

                <div className={styleForm.inp}>
                    <Input type="date" label="DOB" name="dob" value={formData.dob} onChange={handleFormChange} />
                    <Input type="text" label="Gender" name="gender" value={formData.gender} onChange={handleFormChange} />
                    <Input type="number" label="OTP" name="otp" value={formData.otp} onChange={handleFormChange} />
                </div>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your photo here" name="image" type="image" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />

            <Button onClick={handleSubmit}>Save changes</Button>
        </FadeDiv>
    )
}
