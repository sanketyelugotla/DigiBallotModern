import React, { useContext } from 'react'
import FadeDiv from '../../../FadeDiv/FadeDiv'
import Input from '../../../Input/Index'
import { sectionsContext } from '../SectionsContextProvider'
import styleForm from "../CandidateForm.module.css";

export default function Personel({ handleFileSelect, handleFormChange }) {
    const { sections } = useContext(sectionsContext)
    return (
        <FadeDiv fade_in={sections === "personel"} fade_out={sections !== "personel"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <Input.Form className={styleForm.inp}>
                    <Input type="text" label="Full Name" name="fullName" onChange={handleFormChange} />
                    <Input type="email" label="Email" name="email" onChange={handleFormChange} />
                    <Input type="number" label="Mobile Number" name="mobile" onChange={handleFormChange} />
                    <Input type="text" label="Education" name="education" onChange={handleFormChange} />
                    <Input type="password" label="Password" name="password" onChange={handleFormChange} />
                </Input.Form>

                <Input.Form className={styleForm.inp}>
                    <Input type="date" label="DOB" name="dob" onChange={handleFormChange} />
                    <Input type="text" label="Gender" name="gender" onChange={handleFormChange} />
                    <Input type="number" label="OTP" name="otp" onChange={handleFormChange} />
                    <Input type="text" label="Profession" name="profession" onChange={handleFormChange} />
                </Input.Form>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your photo here" name="image" type="image" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />
        </FadeDiv>
    )
}
