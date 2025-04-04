import { useContext, useState } from "react"
import { Input } from "../../../Hooks/index"
import { replace, useNavigate } from "react-router-dom";
import { databaseContext, loadingContext } from "../../../Hooks/ContextProvider/ContextProvider";
import { toast } from "react-toastify";

export default function LoginSide({ changeSide, handleClose, fetchUserDetails }) {
    const { database_url } = useContext(databaseContext);
    const [fomrData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isWrong, setIsWrong] = useState(false);
    const { setLoading } = useContext(loadingContext);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const navigate = useNavigate();

    async function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();

        const { email, password } = fomrData;

        try {
            const response = await fetch(`${database_url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });
            const res = await response.json();
            if (res.success) {
                toast.success("Login successfull");
                localStorage.setItem("authToken", res.token);
                fetchUserDetails();

                handleClose();
                switch (res.role) {
                    case "voter":
                        navigate("/userDashboard");
                        break;
                    case "candidate":
                        navigate("/candidateDashboard");
                        break;
                    case "admin":
                        navigate("/adminDashboard");
                        break;
                    default:
                        console.log("Invalid user type");
                        navigate("/", replace);
                        break;
                }
            } else {
                setIsWrong(true);
                toast.error(res.message)
                console.error("Login failed:", res.message);
            }
        } catch (error) {
            toast.error("Error logging in:", error);
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <h2 className="topLogin">Log in to shape the future!!!</h2>
            <Input.Div>
                <Input.Header>Login</Input.Header>
                <Input.Form action="" method="post">
                    {/* <Input.Dropdown header="Select" options={["option1", "option2"]}>Selection Election Type</Input.Dropdown> */}
                    <Input type="email" label="Email" name="email" onChange={handleChange} />
                    <Input type="password" label="Password" name="password" onChange={handleChange} />
                    <div className="link">
                        <a href="#">Forgot password?</a>
                    </div>
                    {/* <Input.Danger on={isWrong}>Incorrect VoterId or Password</Input.Danger> */}
                    <Input.Submit variant="formbtn" onClick={handleSubmit}>Login</Input.Submit>
                </Input.Form>
            </ Input.Div>
            <p className="createAccount">
                Create an account? <span onClick={changeSide}>Sign Up</span>
            </p>
        </>
    )
}