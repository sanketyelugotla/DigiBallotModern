import React, { useContext, useState } from "react";
import Input from "../../Input/Index";
import styleForm from "./CandidateForm.module.css";
import InputFile from "../../Input/Index";
import { sectionsContext } from "./SectionsContextProvider";

export default function CandidateForm() {
    const { sections } = useContext(sectionsContext);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        education: "",
        password: "",
        dob: "",
        gender: "",
        otp: "",
        profession: "",
        file: null, // Stores selected file
    });

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file selection (receive from InputFile)
    const handleFileSelect = (file) => {
        setFormData((prev) => ({ ...prev, file }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "file") {
                formDataObj.append("file", formData.file);
            } else {
                formDataObj.append(key, formData[key]);
            }
        });

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch("http://localhost:5000/candidates/details", {
                headers: { "auth": token },
                method: "POST",
                body: formDataObj, // Send form data including file
            });

            if (response.ok) {
                alert("Candidate registered successfully!");
            } else {
                alert("Submission failed!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    function handle123() {
        console.log(formData)
    }

    return (
        <div className={styleForm.full}>
            {sections === "personel" && <div className={styleForm.div}>
                <form onSubmit={handleSubmit} className={styleForm.form}>
                    <Input.Div variant="white" className={styleForm.div}>
                        <Input.Form>
                            <Input type="text" label="Full Name" name="fullName" onChange={handleChange} />
                            <Input type="email" label="Email" name="email" onChange={handleChange} />
                            <Input type="number" label="Mobile Number" name="mobile" onChange={handleChange} />
                            <Input type="text" label="Education" name="education" onChange={handleChange} />
                            <Input type="password" label="Password" name="password" onChange={handleChange} />
                        </Input.Form>

                        <Input.Form>
                            <Input type="date" label="DOB" name="dob" onChange={handleChange} />
                            <Input type="text" label="Gender" name="gender" onChange={handleChange} />
                            <Input type="number" label="OTP" name="otp" onChange={handleChange} />
                            <Input type="text" label="Profession" name="profession" onChange={handleChange} />
                        </Input.Form>
                    </Input.Div>

                    {/* File Upload */}
                    <Input.File title="Upload your photo here" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />

                    <button type="submit">Submit</button>
                </form>
            </div>}
            {/* <button onClick={handle123}>click me</button> */}
        </div>
    );
}


{/* <Input.Form>
                    <Input type="text" label="Party" />
                    <Input type="text" label="Image" />
                    <Input type="text" label="Party Img" />
                    <Input type="text" label="Parent" />
                    <Input type="text" label="Age" />
                    <Input type="text" label="Location" />
                    <Input type="text" label="Self Profession" />
                    <Input type="text" label="Spouse Profession" />
                    <Input type="text" label="Assets" />
                    <Input type="text" label="Liabilities" />
                    <Input type="text" label="Education" />
                    <Input type="text" label="Manifesto" />
                    </Input.Form> */}