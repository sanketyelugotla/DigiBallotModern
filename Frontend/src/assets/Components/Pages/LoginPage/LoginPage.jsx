import { useContext, useState } from "react";
import "./LoginPage.css";
import { HoverDiv } from "../../../Hooks/index";
import LoginSide from "./LoginSide";
import SignupSide from "./SignupSide";
import { databaseContext, userContext } from "../../../Hooks/ContextProvider/ContextProvider";

export default function Login({ onClose }) {
    const [isLeft, setIsLeft] = useState(true);

    function changeSide() {
        setIsLeft(!isLeft);
    }
    const { database_url } = useContext(databaseContext);
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
        console.log(res)
        setUser(res.user);

        if (!res.status) navigate("/");
    }

    return (
        <HoverDiv variant="loginForm" onClose={onClose}>
            {({ handleClose }) => (
                <>
                    <div className={`loginHalf ${isLeft ? "" : "signupActive"}`}>
                        <div className={`logContainer ${isLeft ? "fade-in" : "fade-out"}`}>
                            <LoginSide {...{ changeSide, handleClose, fetchUserDetails }} />
                        </div>
                        <div className={`logContainer ${isLeft ? "fade-out" : "fade-in"}`}>
                            <SignupSide {...{ changeSide, handleClose, fetchUserDetails }} />
                        </div>
                    </div>
                    <img src="./pics/voteMe.png" className={`${isLeft ? "" : "signupActive"}`} alt="voteMe" />
                </>
            )}
        </HoverDiv>
    );
}
