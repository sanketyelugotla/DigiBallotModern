import { useState } from "react";
import Header from "./assets/Components/Header/Header";
import Home from "./assets/Components/Pages/Home/Home";
import Footer from "./assets/Components/Footer/Footer";
import Login from "./assets/Components/Pages/LoginPage/LoginPage";
import UserDashboard from "./assets/Components/Pages/UserDashboard/UserDashboard";
import CandidateDashboard from "./assets/Components/Pages/CandateDashboard/CandidateDashboard";
import AdminDashboard from "./assets/Components/Pages/AdminDashboard/AdminDashboard";
import Instructions from "./assets/Components/Pages/Instructions/Intructions";
import Vote from "./assets/Components/Pages/Vote/Vote";
import CandidateDetails from "./assets/Components/Pages/CandidateDetails/CandidateDetails";
import CandidateProfile from "./assets/Components/Pages/CandateDashboard/CandidateProfile";
import Results from "./assets/Components/Pages/Results/Results";
import { HoverDiv } from "./assets/Hooks";

import { Routes, Route, Link } from "react-router-dom"

export default function App() {
    const [isLoginOpen, setLoginOpen] = useState(false);

    const toggleLoginModal = () => setLoginOpen(!isLoginOpen);

    return (
        <HoverDiv.Main open={isLoginOpen} >
            <Header onLoginClick={toggleLoginModal} />
            <div className="space">
                <Routes>
                    <Route path="/" element={<Home {...{ isLoginOpen, toggleLoginModal }} />} />
                    <Route path="/userDashboard" element={<UserDashboard />} />
                    <Route path="/candidateDashboard" element={<CandidateDashboard />} />
                    <Route path="/adminDashboard" element={<AdminDashboard />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/vote" element={<Vote />} />
                    <Route path="/candidateDetails" element={<CandidateDetails />} />
                    <Route path="/candidateProfile" element={<CandidateProfile />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </div>
            <Footer />
            {isLoginOpen && <Login onClose={toggleLoginModal} />}
        </HoverDiv.Main>
    );
}