import React, { useContext } from 'react'
import { FadeDiv, Input } from '../../../../../Hooks';
import { sectionsContext } from '../SectionsContextProvider';
import styleForm from "../AdminForm.module.css";

export default function Party({ handleFileSelect, handleFormChange, formData }) {
    const { sections } = useContext(sectionsContext)
    return (
        <FadeDiv fade_in={sections === "party"} fade_out={sections !== "party"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input type="text" label="Party Affiliation" name="partyName" value={formData.partyName} onChange={handleFormChange} />
                </div>

                <div className={styleForm.inp}>
                    <Input type="text" label="State" name="state" value={formData.state} onChange={handleFormChange} />
                </div>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your party symbol here" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />
        </FadeDiv>
    )
}
