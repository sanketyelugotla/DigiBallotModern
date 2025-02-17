import React, { useContext } from 'react'
import { FadeDiv, Input } from '../../../../Hooks/index'
import { sectionsContext } from '../SectionsContextProvider'
import styleForm from "../CandidateForm.module.css";

export default function Party({ handleFileSelect, handleFormChange }) {
    const { sections } = useContext(sectionsContext)
    return (
        <FadeDiv fade_in={sections === "party"} fade_out={sections !== "party"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <Input.Form className={styleForm.inp}>
                    <Input type="text" label="Party Affiliation" name="partyName" onChange={handleFormChange} />
                </Input.Form>

                <Input.Form className={styleForm.inp}>
                    <Input type="text" label="State" name="state" onChange={handleFormChange} />
                </Input.Form>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your party symbol here" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />
        </FadeDiv>
    )
}
