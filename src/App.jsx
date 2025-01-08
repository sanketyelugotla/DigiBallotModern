import { useState } from "react";
import Header from "./assets/Components/Header/Header";
import Home from "./assets/Components/Pages/Home/Home";
import Footer from "./assets/Components/Footer/Footer";
import Login from "./assets/Components/Pages/LoginPage/LoginPage";
import Logged from "./assets/Components/Pages/Logged/Logged";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const toggleLoginModal = () => setLoginOpen(!isLoginOpen);

  return (
    // <Router>
    <div className={isLoginOpen ? "dim-background" : ""}>
      <Header onLoginClick={toggleLoginModal} />
      <div className="space">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/userDashboard" element={<Logged />} />
        </Routes>
      </div>
      <Footer />
      {isLoginOpen && <Login onClose={toggleLoginModal} />}
    </div>
    // </Router>
  );
}
