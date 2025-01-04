import { useState, useEffect } from "react";
import "./Login.css";

export default function Login({ onClose }) {
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsOpening(true), 10); // Delay slightly to trigger opening animation
    }, []);

    const handleClose = () => {
        setIsClosing(true); // Trigger closing animation
        setTimeout(() => {
            onClose(); // Call parent `onClose` after animation ends
        }, 300); // Match CSS transition duration
    };

    return (
        <div className={`login-overlay ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`}>
            <div className={`login-modal ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`}>
                <button className="close-btn" onClick={handleClose}>
                    ✖
                </button>
                <h2>Login</h2>
                <form>
                    <label>
                        Username:
                        <input type="text" placeholder="Enter username" />
                    </label>
                    <label>
                        Password:
                        <input type="password" placeholder="Enter password" />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
