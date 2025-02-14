import React, { useContext, useState } from "react";
import Input from "../../Input/Index";
import styleForm from "./CandidateForm.module.css";
import { sectionsContext } from "./SectionsContextProvider";
import FadeDiv from "../../FadeDiv/FadeDiv";
import { Personel, Party, Other, Declaration } from "./Forms";

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
        image: null,
        party: "",
        state: "",
        manifesto: null,
        spouse: "",
        spouse_profession: "",
        liabilities: "",
        assets: ""
    });

    // Handle input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file selection dynamically
    const handleFileSelect = (file, name) => {
        console.log(file)
        console.log(name)
        setFormData((prev) => ({ ...prev, [name]: file }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                formDataObj.append(key, formData[key]); // Append all fields dynamically
            }
        });

        console.log("Sending FormData:", [...formDataObj.entries()]); // Debugging

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch("http://localhost:5000/candidates/details", {
                method: "POST",
                headers: { "auth": token },
                body: formDataObj,
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

    return (
        <div className={styleForm.full}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Information */}
                <Personel {...{ handleFormChange, handleFileSelect }} />

                {/* Party Information */}
                <Party {...{ handleFormChange, handleFileSelect }} />

                {/* Other Information */}
                <Other {...{ handleFormChange, handleFileSelect }} />

                {/* Declaration */}
                <Declaration {...{ handleFormChange, handleFileSelect, handleSubmit }} />

            </form>
        </div>
    );
}
