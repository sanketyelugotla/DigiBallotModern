import React, { useContext, useState } from 'react';
import { Button, FadeDiv, Input } from '../../../../../Hooks';
import { databaseContext, loadingContext } from '../../../../../Hooks/ContextProvider/ContextProvider';
import styleForm from "../AdminForm.module.css";
import { sectionsContext } from '../SectionsContextProvider';
import { toast } from 'react-toastify';
import { extractDominantColor } from '../../../../../../utils/ColorExtracter';
export default function Other() {
    const { sections } = useContext(sectionsContext);
    const { database_url } = useContext(databaseContext);
    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        pic: "",
        dominantColor: ""
    });
    const { setLoading } = useContext(loadingContext);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = async (file, name) => {
        try {
            setLoading(true);
            const { hex: dominantColor } = await extractDominantColor(file);
            setFormData((prev) => ({
                ...prev,
                [name]: file,
                dominantColor
            }));
            toast.success(`Dominant color extracted: ${dominantColor}`);
        } catch (error) {
            toast.error("Error processing image");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                formDataObj.append(key, formData[key]);
            }
        });

        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${database_url}/admin/addElection`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formDataObj,
            });
            const res = await response.json();
            if (res.success) {
                toast.success("Election created successfully!");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FadeDiv fade_in={sections === "election"} fade_out={sections !== "election"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input type="text" label="Election Name" name="name" value={formData.name} onChange={handleFormChange} />
                </div>
                <div className={styleForm.inp}>
                    <Input type="date" label="Start date" name="startDate" onChange={handleFormChange} />
                    <Input type="date" label="End date" name="endDate" onChange={handleFormChange} />
                </div>
            </Input.Div>

            <Input.File
                title="Upload your election symbol here"
                label="Max photo size: 5MB"
                onFileSelect={handleFileSelect}
                name="pic"
            />

            {formData.dominantColor && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '10px 0',
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px'
                }}>
                    <div style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: formData.dominantColor,
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}></div>
                    <span>Dominant Color: {formData.dominantColor}</span>
                </div>
            )}

            <Button onClick={handleSubmit}>Create</Button>
        </FadeDiv>
    );
}