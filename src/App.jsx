import { useState } from "react";
import Header from "./assets/Components/Header/Header";
import Home from "./assets/Components/Pages/Home/Home";
import Footer from "./assets/Components/Footer/Footer";
import Login from "./assets/Components/Pages/LoginPage/LoginPage";
import Logged from "./assets/Components/Pages/Logged/Logged";
import Instructions from "./assets/Components/Pages/Instructions/Intructions";
import Vote from "./assets/Components/Pages/Vote/Vote";

import { Routes, Route, Link } from "react-router-dom"

export default function App() {
    const [isLoginOpen, setLoginOpen] = useState(false);

    const toggleLoginModal = () => setLoginOpen(!isLoginOpen);

    return (
        <div className={isLoginOpen ? "dim-background" : ""}>
            <Header onLoginClick={toggleLoginModal} />
            <div className="space">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/userDashboard" element={<Logged />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/vote" element={<Vote />} />
                </Routes>
            </div>
            <Footer />
            {isLoginOpen && <Login onClose={toggleLoginModal} />}
        </div>
    );
}