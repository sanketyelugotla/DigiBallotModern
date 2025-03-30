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
import CandidateProfile from "./assets/Components/Pages/CandateDashboard/CandidateProfile/CandidateProfile";
import Results from "./assets/Components/Pages/Results/Results";
import Election from "./assets/Components/Pages/Vote/Election";
import SelectElection from "./assets/Components/Pages/CandidateDetails/SelectElection";
import SelectResultElection from "./assets/Components/Pages/Results/SelectResultElection";
import RegisterElection from "./assets/Components/Pages/CandateDashboard/CandidateElection/RegisterElection";
import Register from "./assets/Components/Pages/UserDashboard/Register";
import AdminProfile from "./assets/Components/Pages/AdminDashboard/AdminProfile/AdminProfile";

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
                    <Route path="/userDashboard/instructions" element={<Instructions />} />
                    <Route path="/userDashboard/election" element={<Election />} />
                    <Route path="/userDashboard/register" element={<Register />} />
                    <Route path="/userDashboard/vote" element={<Vote />} />

                    <Route path="/candidateDashboard" element={<CandidateDashboard />} />
                    <Route path="/candidateDashboard/profile" element={<CandidateProfile />} />
                    <Route path="/candidateDashboard/election" element={<RegisterElection />} />

                    <Route path="/candidate/election" element={<SelectElection />} />
                    <Route path="/candidate/details" element={<CandidateDetails />} />

                    <Route path="/adminDashboard" element={<AdminDashboard />} />
                    <Route path="/adminDashboard/profile" element={<AdminProfile />} />

                    <Route path="/results/election" element={<SelectResultElection />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </div>
            <Footer />
            {isLoginOpen && <Login onClose={toggleLoginModal} />}
        </HoverDiv.Main>
    );
}