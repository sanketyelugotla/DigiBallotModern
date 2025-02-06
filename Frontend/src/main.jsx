import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './assets/Components/ContextProvider/ContextProvider.jsx'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"


createRoot(document.getElementById('root')).render(
  <Router>
    <StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
    </StrictMode>
  </Router>,
)
