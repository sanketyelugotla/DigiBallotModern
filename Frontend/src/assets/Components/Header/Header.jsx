import "./Header.css";
import { Button } from "../../Hooks/index";
import { loggedContext, stateContext, loginColorState, databaseContext, userContext } from "../../Hooks/ContextProvider/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export default function Header({ onLoginClick }) {
    const { isLogged } = useContext(loggedContext);
    const { colr, handleInButton } = useContext(loginColorState);
    const { database_url } = useContext(databaseContext);
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);

    async function fetchUserDetails() {
        const token = localStorage.getItem("authToken");

        const response = await fetch(`${database_url}/auth/details`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const res = await response.json();

        if (!res.status) {
            navigate("/");
        }
        setUser(res.user);
    }

    useEffect(() => {
        if (!user) fetchUserDetails();
    }, [database_url]);

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
                window.scrollTo({ top: 0, behavior: "smooth" });
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
                {/* <li
                    id="candidates"
                    className={`${liElements.candidates ? "selected" : ""}`}
                    onClick={handleClick}
                >
                    Candidates
                </li> */}
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
                {user ? (
                    <div className="profile-container">
                        <CgProfile className="icon" />
                        <p className="username">{user.name}</p>
                    </div>
                ) : (
                    <Button variant="light" onClick={() => handleInButton("voter", onLoginClick)}>
                        Login
                    </Button>
                )}
            </div>
        </header>
    );
}

