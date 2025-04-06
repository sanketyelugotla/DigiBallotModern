import React, { createContext, useState } from 'react'
const loggedContext = createContext();
const stateContext = createContext();
const partiesContext = createContext();
const userTypeContext = createContext();
const loginColorState = createContext();
const loginColors = createContext();
const databaseContext = createContext();
const electionDetails = createContext();
const userContext = createContext();
const loadingContext = createContext();

export default function ContextProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false);
    const [presentState, setPresentState] = useState("landing");
    const [selectedParty, setSelectedParty] = useState("");
    const [userType, setUserType] = useState("voter");
    const [selectedElection, setSelectedElection] = useState("");
    const [colr, setCol] = useState({
        main: "#1e3a8a",
        sub: "2559AA"
    })
    const [user, setUser] = useState();

    function handleInButton(col, toggleLoginModal) {
        setUserType(col);
        setCol({
            main: outside[col],
            sub: inside[col]
        });
        toggleLoginModal();
    }
    const outside = {
        "voter": "#1e3a8a",
        "candidate": "#5406ac",
        "admin": "#065F46"
    }

    const inside = {
        "voter": "#2559AA",
        "candidate": "#6708d3",
        "admin": "#0A8F6A"
    }

    const [loading, setLoading] = useState(false);

    // const database_url = "http://localhost:5000"
    const database_url = "https://digi-ballot-modern.vercel.app"

    return (
        <loggedContext.Provider value={{ isLogged, setIsLogged }}>
            <stateContext.Provider value={{ presentState, setPresentState }}>
                <partiesContext.Provider value={{ selectedParty, setSelectedParty }}>
                    <userTypeContext.Provider value={{ userType, setUserType }} >
                        <loginColorState.Provider value={{ colr, handleInButton }} >
                            <loginColors.Provider value={{ outside, inside }} >
                                <databaseContext.Provider value={{ database_url }} >
                                    <electionDetails.Provider value={{ selectedElection, setSelectedElection }}>
                                        <userContext.Provider value={{ user, setUser }} >
                                            <loadingContext.Provider value={{ loading, setLoading }}>
                                                {children}
                                            </loadingContext.Provider>
                                        </userContext.Provider>
                                    </electionDetails.Provider>
                                </databaseContext.Provider>
                            </loginColors.Provider>
                        </loginColorState.Provider>
                    </userTypeContext.Provider>
                </partiesContext.Provider>
            </stateContext.Provider>
        </loggedContext.Provider>
    )
}

export {
    loggedContext,
    stateContext,
    partiesContext,
    userTypeContext,
    loginColors,
    loginColorState,
    databaseContext,
    electionDetails,
    userContext,
    loadingContext
}