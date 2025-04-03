import React, { useContext, useEffect, useState } from "react";
import { databaseContext, userContext, loadingContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import styleForm from "./AdminForm.module.css";
import { Election, Party, Personel } from "./Forms";
import { sectionsContext } from "./SectionsContextProvider";

export default function AdminForm() {
    const { sections } = useContext(sectionsContext);
    const { database_url } = useContext(databaseContext);
    const { user } = useContext(userContext);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        dob: "",
        gender: "",
        otp: "",
    });
    const { setLoading } = useContext(loadingContext);

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
        setLoading(true);
        e.preventDefault();
        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                formDataObj.append(key, formData[key]); // Append all fields dynamically
            }
        });

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/candidates/details`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formDataObj,
            });

            if (response.ok) {
                alert("Candidate registered successfully!");
            } else {
                alert("Submission failed!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styleForm.full}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Information */}
                <Personel {...{ handleFormChange, handleFileSelect, formData }} />

                {/* Party Information */}
                <Party {...{ handleFormChange, handleFileSelect, formData }} />

                {/* Other Information */}
                <Election {...{ handleFormChange, handleFileSelect, formData }} />

            </form>
        </div>
    );
}
