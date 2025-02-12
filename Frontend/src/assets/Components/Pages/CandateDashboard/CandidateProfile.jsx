import React from 'react'
import CandidateForm from './CandidateForm'
import LeftNav from './LeftNav'
import StyleProf from "./CandidateProfile.module.css"

export default function CandidateProfile() {
    return (
        <div className={StyleProf.prof}>
            <LeftNav />
            <CandidateForm />
        </div>
    )
}
