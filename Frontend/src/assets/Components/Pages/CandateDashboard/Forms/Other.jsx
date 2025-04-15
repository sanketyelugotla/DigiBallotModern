import React, { useContext } from 'react'
import { FadeDiv, Input, Button } from '../../../../Hooks/index'
import { sectionsContext } from "../CandidateProfile/SectionsContextProvider";
import styleForm from "../CandidateProfile/CandidateForm.module.css";

export default function Other({ handleFileSelect, handleFormChange, formData, handleSubmit }) {
    const { sections } = useContext(sectionsContext)
    return (
        <FadeDiv fade_in={sections === "other"} fade_out={sections !== "other"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input type="text" label="Spouse Name" name="spouse" value={formData.spouse} onChange={handleFormChange} />
                    <Input type="text" label="Spouse Profession" name="spouse_profession" value={formData.spouse_profession} onChange={handleFormChange} />
                </div>
                <div className={styleForm.inp}>
                    <Input type="text" label="Liabilities" name="liabilities" value={formData.liabilities} onChange={handleFormChange} />
                    <Input type="text" label="Assets" name="assets" value={formData.assets} onChange={handleFormChange} />
                </div>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your Manifesto here" name="manifesto" type="pdf" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />
            <Button size="lg" onClick={handleSubmit}>Save</Button>
        </FadeDiv >
    )
}
