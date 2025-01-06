import { useState, useEffect } from "react";
import "./LoginPage.css";
import LoginSide from "./LoginSide";
import SignupSide from "./SignupSide";

export default function Login({ onClose }) {
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [isleft, setIsLeft] = useState(false)

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

    const picRight =
        <>
            <LoginSide changeSide={changeSide} />
            <img src="./pics/voteMe.png" alt="voteMe" />
        </>

    const picLeft =
        <>
            <img src="./pics/voteMe.png" className="rightPic" alt="voteMe" />
            <SignupSide changeSide={changeSide} />
        </>

    const name1 = `login-overlay ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`

    const name2 = `login-modal ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`

    return (
        <div className={name1} onClick={handleOverlayClick}>
            <div className={name2}>
                {/* <button className="close-btn" onClick={handleClose}>
                    ✖
                </button> */}
                {isleft ? picLeft : picRight}
            </div>
        </div>
    );
}
