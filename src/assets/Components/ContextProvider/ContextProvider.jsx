import React, { createContext, useState } from 'react'
const loggedContext = createContext();
const stateContext = createContext();

export default function ContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [presentState, setPresentState] = useState("landing");

  return (
    <loggedContext.Provider value={{ isLogged, setIsLogged }}>
      <stateContext.Provider value={{ presentState, setPresentState }}>
        {children}
      </stateContext.Provider>
    </loggedContext.Provider>
  )
}

export { loggedContext, stateContext }