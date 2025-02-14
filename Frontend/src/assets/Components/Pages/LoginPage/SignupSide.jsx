import { useSearchParams } from "react-router-dom"
import Input from "../../Input/Index"
import { useContext, useState } from "react"
import { databaseContext } from "../../ContextProvider/ContextProvider"
import { userTypeContext } from "../../ContextProvider/ContextProvider"

export default function SignupSide({ changeSide, handleLogin }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        password: ""
    })
    const { userType } = useContext(userTypeContext);
    const { database_url } = useContext(databaseContext);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const { name, email, number, password } = formData;
        try {
            const response = await fetch(`${database_url}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role: userType })
            })
            const res = await response.json();

            if (response.ok) {
                window.alert("Please login to continue");
                changeSide();
            } else {
                // setIsWrong(true);
                console.error("SignUp failed:", res.message);
            }

        } catch (error) {
            console.log("Signup failed ", error);
        }
    }

    return (
        <>
            <h2 className="topLogin">Sign Up and make your voice heard!!!</h2>
            <Input.Div>
                <Input.Header>Sign Up</Input.Header>
                <Input.Form onSubmit={handleSubmit} action="" method="post" >
                    <Input type="text" label="Full Name" name="name" onChange={handleChange} />
                    <Input type="email" label="Email" name="email" onChange={handleChange} />
                    <Input type="text" label="Phone Number" name="number" onChange={handleChange} />
                    <Input type="password" label="Password" name="password" onChange={handleChange} />
                    <Input.checkbox>Agree to the terms & conditions</Input.checkbox>
                    <Input.Submit>Sign Up</Input.Submit>
                </Input.Form>
            </ Input.Div>
            <p className="createAccount">
                Already have an account? <span onClick={changeSide}>Login</span>
            </p>
        </>
    )
}