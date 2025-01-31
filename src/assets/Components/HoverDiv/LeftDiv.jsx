import LoginSide from "../Pages/LoginPage/LoginSide"
import SignupSide from "../Pages/LoginPage/SignupSide"

export default function LeftDiv({ isLeft, changeSide, handleClose }) {
    return (
        <div className={`loginHalf ${isLeft ? "" : "signupActive"}`}>
            <div className={`logContainer ${isLeft ? "fade-in" : "fade-out"}`}>
                <LoginSide {...{ changeSide, handleClose }} />
            </div>
            <div className={`logContainer ${isLeft ? "fade-out" : "fade-in"}`}>
                <SignupSide {...{ changeSide, handleClose }} />
            </div>
        </div>
    );
}
