// FilterContext.js
import React, { createContext, useState } from 'react';

const SelectedStatusContext = createContext();
const SelectedElectionContext = createContext();

export default function FilterContext({ children }) {
    const [selectedStatuses, setSelectedStatuses] = useState(["All"]);
    const [selectedElections, setSelectedElections] = useState(["all"]);

    return (
        <SelectedStatusContext.Provider value={{ selectedStatuses, setSelectedStatuses }}>
            <SelectedElectionContext.Provider value={{ selectedElections, setSelectedElections }}>
                {children}
            </SelectedElectionContext.Provider>
        </SelectedStatusContext.Provider>
    )
}

export {
    SelectedElectionContext,
    SelectedStatusContext
}