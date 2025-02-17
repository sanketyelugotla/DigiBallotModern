import React, { useContext } from 'react'
import { FadeDiv, Input } from '../../../../Hooks/index'
import sectionsContext from "../SectionsContextProvider"
import styleForm from "../CandidateForm.module.css";

export default function Declaration({ handleFileSelect, handleFormChange, handleSubmit }) {
    const { sections } = useContext(sectionsContext)
    return (
        <FadeDiv fade_in={sections === "declaration"} fade_out={sections !== "declaration"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <Input.Form className={styleForm.decl}>
                    <Input.checkbox size="large">
                        I hereby declare that the information provided is true and accurate. I understand that providing false information will result in disqualification
                    </Input.checkbox>
                </Input.Form>
            </Input.Div>
            <button type="submit" onClick={handleSubmit}>Submit</button>

        </FadeDiv>
    )
}
