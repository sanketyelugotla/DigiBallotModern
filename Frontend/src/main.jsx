import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './assets/Hooks/ContextProvider/ContextProvider.jsx'
import SectionsContextProvider from './assets/Components/Pages/AdminDashboard/AdminProfile/SectionsContextProvider.jsx'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"


createRoot(document.getElementById('root')).render(
  <Router>
    <StrictMode>
      <ContextProvider>
        <SectionsContextProvider>
          <App />
        </SectionsContextProvider>
      </ContextProvider>
    </StrictMode>
  </Router>,
)
