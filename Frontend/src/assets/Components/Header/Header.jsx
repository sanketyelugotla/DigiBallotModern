import "./Header.css";
import Button from "../Button/Button";
import { loggedContext } from "../ContextProvider/ContextProvider";
import { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { stateContext } from "../ContextProvider/ContextProvider";
import { loginColorState } from "../ContextProvider/ContextProvider";

export default function Header({ onLoginClick }) {
    const { isLogged } = useContext(loggedContext);
    const { colr, handleInButton } = useContext(loginColorState);

    const [liElements, setLiElements] = useState({
        home: true,
        candidates: false,
        faq: false,
        contact: false,
    });

    const { presentState } = useContext(stateContext);

    const handleClick = (event) => {
        const { id } = event.target;
        if (id === "contact") {
            const footerElement = document.getElementById("footer");
            if (footerElement) {
                footerElement.scrollIntoView({ behavior: "smooth" });
            }
        } else if (id === "home") {
            if (presentState === "landing") {
                window.scrollTo({ top: 0, behavior: "smooth", });
            }
        }

        setLiElements((prev) => ({
            home: false,
            candidates: false,
            faq: false,
            contact: false,
            [id]: true,
        }));
    };

    return (
        <header className="header">
            <span className="logo">DigiBallot</span>
            <ul className="nav-list">
                <li
                    id="home"
                    className={`${liElements.home ? "selected" : ""}`}
                    onClick={handleClick}
                >
                    Home
                </li>
                <li
                    id="candidates"
                    className={`${liElements.candidates ? "selected" : ""}`}
                    onClick={handleClick}
                >
                    Candidates
                </li>
                <li
                    id="faq"
                    className={`${liElements.faq ? "selected" : ""}`}
                    onClick={handleClick}
                >
                    FAQ
                </li>
                <li
                    id="contact"
                    className={`${liElements.contact ? "selected" : ""}`}
                    onClick={handleClick}
                >
                    Contact
                </li>
            </ul>
            <div className="profile">
                {isLogged ? (
                    <div>
                        <CgProfile className="icon" />
                        <p>Sanket Yelugotla</p>
                    </div>
                ) : (
                    <Button variant="light" onClick={() => handleInButton("user", onLoginClick)}>
                        Login
                    </Button>
                )}
            </div>
        </header >
    );
}
