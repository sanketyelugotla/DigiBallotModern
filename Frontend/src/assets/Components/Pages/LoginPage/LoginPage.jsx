import { useState } from "react";
import "./LoginPage.css";
import { HoverDiv } from "../../../Hooks/index";
import LoginSide from "./LoginSide";
import SignupSide from "./SignupSide";

export default function Login({ onClose }) {
    const [isLeft, setIsLeft] = useState(true);

    function changeSide() {
        setIsLeft(!isLeft);
    }

    return (
        <HoverDiv variant="loginForm" onClose={onClose}>
            {({ handleClose }) => (
                <>
                    <div className={`loginHalf ${isLeft ? "" : "signupActive"}`}>
                        <div className={`logContainer ${isLeft ? "fade-in" : "fade-out"}`}>
                            <LoginSide {...{ changeSide, handleClose }} />
                        </div>
                        <div className={`logContainer ${isLeft ? "fade-out" : "fade-in"}`}>
                            <SignupSide {...{ changeSide, handleClose }} />
                        </div>
                    </div>
                    <img src="./pics/voteMe.png" className={`${isLeft ? "" : "signupActive"}`} alt="voteMe" />
                </>
            )}
        </HoverDiv>
    );
}
