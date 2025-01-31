import React, { createContext, useState } from 'react'
const loggedContext = createContext();
const stateContext = createContext();
const partiesContext = createContext();

export default function ContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [presentState, setPresentState] = useState("landing");
  const [selectedParty, setSelectedParty] = useState("");

  return (
    <loggedContext.Provider value={{ isLogged, setIsLogged }}>
      <stateContext.Provider value={{ presentState, setPresentState }}>
        <partiesContext.Provider value={{ selectedParty, setSelectedParty }}>
          {children}
        </partiesContext.Provider>
      </stateContext.Provider>
    </loggedContext.Provider>
  )
}

export { loggedContext, stateContext, partiesContext }