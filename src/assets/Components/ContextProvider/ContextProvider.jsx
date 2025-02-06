import React, { createContext, useState } from 'react'
const loggedContext = createContext();
const stateContext = createContext();
const partiesContext = createContext();
const userTypeContext = createContext();

export default function ContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [presentState, setPresentState] = useState("landing");
  const [selectedParty, setSelectedParty] = useState("");
  const [userType, setUserType] = useState("user");

  return (
    <loggedContext.Provider value={{ isLogged, setIsLogged }}>
      <stateContext.Provider value={{ presentState, setPresentState }}>
        <partiesContext.Provider value={{ selectedParty, setSelectedParty }}>
          <userTypeContext.Provider value={{ userType, setUserType }} >
            {children}
          </userTypeContext.Provider>
        </partiesContext.Provider>
      </stateContext.Provider>
    </loggedContext.Provider>
  )
}

export { loggedContext, stateContext, partiesContext, userTypeContext }