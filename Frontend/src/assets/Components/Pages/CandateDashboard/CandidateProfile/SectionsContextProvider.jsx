import React, { createContext, useState } from 'react'
const sectionsContext = createContext()

export default function SectionsContextProvider({ children }) {
    const [sections, setSections] = useState("personel");

    return (
        <sectionsContext.Provider value={{ sections, setSections }}>
            {children}
        </sectionsContext.Provider>
    )
}

export { sectionsContext }