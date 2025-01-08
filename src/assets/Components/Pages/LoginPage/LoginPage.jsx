import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import LoginSide from "./LoginSide";
import SignupSide from "./SignupSide";

export default function Login({ onClose }) {
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [isleft, setIsLeft] = useState(true)

    const navigate = useNavigate();

    function handleLogin() {
        // e.preventDefault();
        navigate("/userDashboard")
    }

    function changeSide() {
        setIsLeft(!isleft)
    }

    useEffect(() => {
        setTimeout(() => setIsOpening(true), 10);
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("login-overlay")) {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const name1 = `login-overlay ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`

    const name2 = `login-modal ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`

    return (
        <div className={name1} onClick={handleOverlayClick}>
            <div className={name2}>
                {/* <button className="close-btn" onClick={handleClose}>
                    ✖
                </button> */}
                <div className={`loginHalf ${isleft ? "" : "signupActive"}`}>
                    <div className={`logContainer ${isleft ? "fade-in" : "fade-out"}`}>
                        <LoginSide changeSide={changeSide} handleLogin={handleLogin} />
                    </div>
                    <div className={`logContainer ${isleft ? "fade-out" : "fade-in"}`}>
                        <SignupSide changeSide={changeSide} handleLogin={handleLogin} />
                    </div>
                </div>
                <img src="./pics/voteMe.png" className={`${isleft ? "" : "signupActive"}`} alt="voteMe" />
            </div>
        </div>
    );
}
