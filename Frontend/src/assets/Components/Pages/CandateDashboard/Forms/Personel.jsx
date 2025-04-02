import React, { useContext } from 'react'
import { Button, FadeDiv, Input } from '../../../../Hooks/index'
import { sectionsContext } from "../CandidateProfile/SectionsContextProvider";
import styleForm from "../CandidateProfile/CandidateForm.module.css";

export default function Personel({ handleFileSelect, handleFormChange, formData, handleSubmit }) {
    const { sections } = useContext(sectionsContext)
    return (
        <FadeDiv fade_in={sections === "personel"} fade_out={sections !== "personel"} className={styleForm.form} variant="form">
            <Input.Div variant="white" className={styleForm.div}>
                <div className={styleForm.inp}>
                    <Input type="text" label="Full Name" name="fullName" value={formData.fullName} onChange={handleFormChange} />
                    <Input type="email" label="Email" name="email" value={formData.email} onChange={handleFormChange} />
                    <Input type="number" label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleFormChange} />
                    <Input type="text" label="Education" name="education" value={formData.education} onChange={handleFormChange} />
                    <Input type="password" label="Password" name="password" value={formData.password} onChange={handleFormChange} />
                </div>

                <div className={styleForm.inp}>
                    <Input type="date" label="DOB" name="dob" value={formData.dob} onChange={handleFormChange} />
                    <Input type="text" label="Gender" name="gender" value={formData.gender} onChange={handleFormChange} />
                    <Input type="number" label="OTP" name="otp" value={formData.otp} onChange={handleFormChange} />
                    <Input type="text" label="Profession" name="profession" value={formData.profession} onChange={handleFormChange} />
                </div>
            </Input.Div>

            {/* File Upload */}
            <Input.File title="Upload your photo here" name="image" type="image" label="Max photo size: 5MB" onFileSelect={handleFileSelect} />
            <Button size="lg" onClick={handleSubmit}>Save</Button>
        </FadeDiv>
    )
}
