import React, { createContext, useState } from 'react'
const loggedContext = createContext();
const stateContext = createContext();
const partiesContext = createContext();
const userTypeContext = createContext();
const loginColorState = createContext();
const loginColors = createContext();
const databaseContext = createContext();

export default function ContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [presentState, setPresentState] = useState("landing");
  const [selectedParty, setSelectedParty] = useState("");
  const [userType, setUserType] = useState("voter");
  const [colr, setCol] = useState({
    main: "#1e3a8a",
    sub: "2559AA"
  })
  function handleInButton(col, toggleLoginModal) {
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
  const database_url = "http://localhost:5000"

  return (
    <loggedContext.Provider value={{ isLogged, setIsLogged }}>
      <stateContext.Provider value={{ presentState, setPresentState }}>
        <partiesContext.Provider value={{ selectedParty, setSelectedParty }}>
          <userTypeContext.Provider value={{ userType, setUserType }} >
            <loginColorState.Provider value={{ colr, handleInButton }} >
              <loginColors.Provider value={{ outside, inside }} >
                <databaseContext.Provider value={{ database_url }} >
                  {children}
                </databaseContext.Provider>
              </loginColors.Provider>
            </loginColorState.Provider>
          </userTypeContext.Provider>
        </partiesContext.Provider>
      </stateContext.Provider>
    </loggedContext.Provider>
  )
}

export { loggedContext, stateContext, partiesContext, userTypeContext, loginColors, loginColorState, databaseContext }