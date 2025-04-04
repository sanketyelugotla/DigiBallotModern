import React, { useContext, useState } from 'react';
import { Button, FadeDiv, Input } from '../../../../../Hooks';
import { databaseContext, loadingContext } from '../../../../../Hooks/ContextProvider/ContextProvider';
import styleForm from "../AdminForm.module.css";
import { sectionsContext } from '../SectionsContextProvider';
import { toast } from 'react-toastify';

export default function Other() {
    const { sections } = useContext(sectionsContext)
    const { database_url } = useContext(databaseContext)

    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        pic: ""
    });
    const { setLoading } = useContext(loadingContext);

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
            const response = await fetch(`${database_url}/admin/addElection`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }, // Ensure Bearer token
                body: formDataObj, // FormData automatically sets Content-Type
            });
            const res = await response.json();
            if (res.success) {
                toast.success("Election created successfully!");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(res.message)
        } finally {
            setLoading(false);
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
