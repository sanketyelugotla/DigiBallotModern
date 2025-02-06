import { useContext, useState } from "react"
import Input from "../../Input/Index"
import { useNavigate } from "react-router-dom";
import { loggedContext } from "../../ContextProvider/ContextProvider";
import { stateContext } from "../../ContextProvider/ContextProvider";
import { userTypeContext } from "../../ContextProvider/ContextProvider";

export default function LoginSide({ changeSide, handleClose }) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTRhZTcwZDE2YjQwZjNiNzBkZGRmNyIsInJvbGUiOiJ2b3RlciIsImlhdCI6MTczODg1MDIzOCwiZXhwIjoxNzM4ODUzODM4fQ.OFpV6cBOVdmoierzYb8MAunF3M8BT_tm6Rr3LPtfqlk"
    const { presentState, setPresentState } = useContext(stateContext);
    const { isLogged, setIsLogged } = useContext(loggedContext);
    const [fomrData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { userType, setUserType } = useContext(userTypeContext);
    const [isWrong, setIsWrong] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const { email, password } = fomrData;

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            });

            const res = await response.json();

            if (response.ok) {
                console.log("JWT Token:", res.token);

                // Store token in localStorage for authentication
                localStorage.setItem("authToken", res.token);

                // Navigate to dashboard
                handleClose();
                navigate("/userDashboard");
                setPresentState("userDashboard");
                setIsLogged(true);
            } else {
                setIsWrong(true);
                console.error("Login failed:", res.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }


    return (
        <>
            <h2 className="topLogin">Log in to shape the future!!!</h2>
            <Input.Div>
                <Input.Header>Login</Input.Header>
                <Input.Form action="" method="post" >
                    <Input type="email" label="Voter Id" name="email" onChange={handleChange} />
                    <Input type="password" label="Password" name="password" onChange={handleChange} />
                    <div className="link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <Input.Danger on={isWrong}>Incorrect VoterId or Password</Input.Danger>
                    <Input.Submit variant="formbtn" onClick={handleSubmit}>Login</Input.Submit>
                </Input.Form>
            </ Input.Div>
            <p className="createAccount">
                Create an account? <span onClick={changeSide}>Sign Up</span>
            </p>
        </>
    )
}