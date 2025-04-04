import "./Header.css";
import { Button } from "../../Hooks/index";
import { loggedContext, stateContext, loginColorState, databaseContext, userContext, loadingContext } from "../../Hooks/ContextProvider/ContextProvider";
import { useContext, useEffect, useState, useRef } from "react";
import { replace, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HoverDiv } from "../../Hooks/index";
import { FaAngleDown } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";

export default function Header({ onLoginClick }) {
    const { isLogged } = useContext(loggedContext);
    const { colr, handleInButton } = useContext(loginColorState);
    const { database_url } = useContext(databaseContext);
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profilePosition, setProfilePosition] = useState({ top: 0, left: 0 });

    const { setLoading} = useContext(loadingContext);

    const usernameRef = useRef(null);


    async function fetchUserDetails() {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch(`${database_url}/auth/details`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const res = await response.json();
            if (!res.success) {
                navigate("/");
            } else {
                setUser(res.user);
            }
        } catch (error) {
            navigate("/", replace);
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
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

    function handleProfileOpen() {
        setIsProfileOpen(!isProfileOpen);

        if (usernameRef.current) {
            const rect = usernameRef.current.getBoundingClientRect();
            setProfilePosition({
                top: rect.bottom + 10, // Below the username
                left: rect.left, // Align with the username
            });
        }
    }

    function handleLogout() {
        localStorage.removeItem("authToken");
        handleProfileOpen();
        setUser(null);
        navigate("/");
    }

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
                    <div className="profile-container" onClick={handleProfileOpen}>
                        <CgProfile className="icon" />
                        <p ref={usernameRef} className="username">{user.name}</p>
                        <FaAngleDown className="right-icon" />
                    </div>
                ) : (
                    <Button variant="light" onClick={() => handleInButton("voter", onLoginClick)}>
                        Login
                    </Button>
                )}
            </div>
            {
                isProfileOpen &&
                <HoverDiv onClose={handleProfileOpen} insideDiv="aprofileHover"
                    shade="light"
                    style={{ top: `${profilePosition.top}px`, left: `${profilePosition.left}px`, position: "absolute" }}>
                    {({ handleClose }) => (
                        <div className="mainProfile">
                            <p className="eachProfile"><Button variant="cdanger" onClick={handleLogout}>Logout</Button></p>
                        </div>
                    )}
                </HoverDiv>
            }
        </header>
    );
}
