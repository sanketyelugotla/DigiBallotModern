import { useState, useEffect } from "react";
import "./LoginPage.css";
import Input from "../../Input/Index"

export default function Login({ onClose }) {
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsOpening(true), 10); // Trigger opening animation after rendering
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("login-overlay")) {
            handleClose(); // Close only if clicking outside the modal
        }
    };

    const handleClose = () => {
        setIsClosing(true); // Trigger closing animation
        setTimeout(() => {
            onClose(); // Call parent `onClose` after animation ends
        }, 300); // Match CSS transition duration
    };

    const name1 = `login-overlay ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`

    const name2 = `login-modal ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`

    return (
        <div className={name1} onClick={handleOverlayClick}>
            <div className={name2}>
                {/* <button className="close-btn" onClick={handleClose}>
                    ✖
                </button> */}
                <div className="loginHalf">
                    <h2 className="topLogin">Log in to shape the future!!!</h2>
                    <Input.Div>
                        <Input.Header>Login</Input.Header>
                        <Input.Form action="" method="post" >
                            <Input type="text" label="Voter Id" />
                            <Input type="password" label="Password" />
                            <div className="link">
                                <a href="#">Forgot password?</a>
                            </div>
                            <Input.Submit>Login</Input.Submit>
                        </Input.Form>
                    </ Input.Div>
                    <p className="createAccount">Create an account? <span>Sign Up</span></p>
                </div>
                <div>
                    <img src="./pics/voteMe.png" alt="voteMe" />
                </div>
            </div>
        </div>
    );
}
