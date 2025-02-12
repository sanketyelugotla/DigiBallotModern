import React from 'react'
import Input from "../../Input/Index"
import styleForm from "./CandidateForm.module.css"

export default function CandidateForm() {
    return (
        <div className={styleForm.div}>
            <Input.Div variant="white" className={styleForm.div}>
                <Input.Form>
                    <Input type="text" label="Full Name" />
                    <Input type="email" label="Email" />
                    <Input type="number" label="Mobile Number" />
                    <Input type="text" label="Education" />
                    <Input type="password" label="Password" />
                </Input.Form>

                <Input.Form>
                    <Input type="date" label="DOB" />
                    <Input type="text" label="Gender" />
                    <Input type="number" label="OTP" />
                    <Input type="text" label="Profession" />
                    <label for="upload-photo">Browse...</label>
                    <input type="file" name="photo" className={styleForm.upload_photo} />
                </Input.Form>


                {/* <Input.Form>
                    <Input type="text" label="Party" />
                    <Input type="text" label="Image" />
                    <Input type="text" label="Party Img" />
                    <Input type="text" label="Parent" />
                    <Input type="text" label="Age" />
                    <Input type="text" label="Location" />
                    <Input type="text" label="Self Profession" />
                    <Input type="text" label="Spouse Profession" />
                    <Input type="text" label="Assets" />
                    <Input type="text" label="Liabilities" />
                    <Input type="text" label="Education" />
                    <Input type="text" label="Manifesto" />
                </Input.Form> */}
            </Input.Div>
        </div>
    )
}
