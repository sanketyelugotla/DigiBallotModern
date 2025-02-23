import React, { useContext } from 'react'
import { FadeDiv, Input } from '../../../../Hooks/index'
import { sectionsContext } from "../CandidateProfile/SectionsContextProvider";
import styleForm from "../CandidateProfile/CandidateForm.module.css";

export default function Other({ handleFileSelect, handleFormChange }) {
    const { sections } = useContext(sectionsContext)
    return (
        <FadeDiv fade_in={sections === "other"} fade_out={sections !== "other"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <Input.Form className={styleForm.inp}>
                    <Input type="text" label="Spouse Name" name="spouse" onChange={handleFormChange} />
                    <Input type="text" label="Spouse Profession" name="spouse_profession" onChange={handleFormChange} />
                </Input.Form>
                <Input.Form className={styleForm.inp}>
                    <Input type="text" label="Liabilities" name="liabilities" onChange={handleFormChange} />
                    <Input type="text" label="Assets" name="assets" onChange={handleFormChange} />
                </Input.Form>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your Manifesto here" name="manifesto" type="pdf" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />
        </FadeDiv >
    )
}
