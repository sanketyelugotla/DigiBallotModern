import React, { useState } from 'react'
import CandidateForm from './CandidateForm'
import LeftNav from './LeftNav/LeftNav'
import SectionsContextProvider from './SectionsContextProvider'
import StyleProf from "./CandidateProfile.module.css"

export default function CandidateProfile() {
    return (
        <div className={StyleProf.prof}>
            <SectionsContextProvider>
                <LeftNav />
                <CandidateForm />
            </SectionsContextProvider>
        </div>
    )
}
