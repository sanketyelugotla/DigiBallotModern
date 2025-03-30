import React, { useState } from 'react'
import AdminForm from './AdminForm'
import LeftNav from './LeftNav/LeftNav'
import SectionsContextProvider from './SectionsContextProvider'
import StyleProf from "./AdminProfile.module.css"

export default function AdminProfile() {
    return (
        <div className={StyleProf.prof}>
            <LeftNav />
            <AdminForm />
        </div>
    )
}
