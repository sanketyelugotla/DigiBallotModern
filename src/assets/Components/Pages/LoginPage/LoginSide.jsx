import { useState } from "react"
import Input from "../../Input/Index"
import { useNavigate } from "react-router-dom";


export default function LoginSide({ changeSide, handleClose }) {
    const [fomrData, setFormData] = useState({
        id: "",
        password: ""
    })

    const [isWrong, setIsWrong] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const { id, password } = fomrData;
        if (id === "sanket" && password === "sanket123") {
            handleClose();
            navigate("/userDashboard")
        }
        else {
            setIsWrong(true);
        }
    }

    return (
        <>
            <h2 className="topLogin">Log in to shape the future!!!</h2>
            <Input.Div>
                <Input.Header>Login</Input.Header>
                <Input.Form action="" method="post" >
                    <Input type="text" label="Voter Id" name="id" onChange={handleChange} />
                    <Input type="password" label="Password" name="password" onChange={handleChange} />
                    <div className="link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <Input.Danger on={isWrong}>Incorrect VoterId or Password</Input.Danger>
                    <Input.Submit onClick={handleSubmit}>Login</Input.Submit>
                </Input.Form>
            </ Input.Div>
            <p className="createAccount">
                Create an account? <span onClick={changeSide}>Sign Up</span>
            </p>
        </>
    )
}