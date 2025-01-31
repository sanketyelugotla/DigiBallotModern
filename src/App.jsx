import { useState } from "react";
import Header from "./assets/Components/Header/Header";
import Home from "./assets/Components/Pages/Home/Home";
import Footer from "./assets/Components/Footer/Footer";
import Login from "./assets/Components/Pages/LoginPage/LoginPage";
import UserDashboard from "./assets/Components/Pages/UserDashboard/UserDashboard"
import Instructions from "./assets/Components/Pages/Instructions/Intructions";
import Vote from "./assets/Components/Pages/Vote/Vote";
import CandidateDetails from "./assets/Components/Pages/CandidateDetails/CandidateDetails";

import { Routes, Route, Link } from "react-router-dom"

export default function App() {
    const [isLoginOpen, setLoginOpen] = useState(false);
    // const name = localStorage.getItem("name");

    const toggleLoginModal = () => setLoginOpen(!isLoginOpen);

    return (
        <div className={isLoginOpen ? "dim-background" : ""}>
            <Header onLoginClick={toggleLoginModal} />
            <div className="space">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/userDashboard" element={<UserDashboard />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/vote" element={<Vote />} />
                    <Route path="candidateDetails" element={<CandidateDetails />} />
                </Routes>
            </div>
            <Footer />
            {isLoginOpen && <Login onClose={toggleLoginModal} />}
        </div>
    );
}