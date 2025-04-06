import React, { createContext, useState } from 'react'

const selectedStatusContext = createContext();
const selectedElectionContext = createContext();


export default function FilterContext({ children }) {

    const [selectedStatuses, setSelectedStatuses] = useState(["All"]);
    const [selectedElections, setSelectedElections] = useState(["all"]);

    return (
        <selectedStatusContext.Provider value={{ selectedStatuses, setSelectedStatuses }}>
            <selectedElectionContext.Provider value={{ selectedStatuses, setSelectedStatuses }}>
                {children}
            </selectedElectionContext.Provider>
        </selectedStatusContext.Provider>
    )
}

export {
    selectedElectionContext,
    selectedStatusContext
}