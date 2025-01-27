import { useSearchParams } from "react-router-dom"
import Input from "../../Input/Index"
import { useState } from "react"

export default function SignupSide({ changeSide, handleLogin }) {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        number: "",
        password: ""
    })

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault();
        changeSide();
    }

    return (
        <>
            <h2 className="topLogin">Sign Up and make your voice heard!!!</h2>
            <Input.Div>
                <Input.Header>Sign Up</Input.Header>
                <Input.Form onSubmit={handleSubmit} action="" method="post" >
                    <Input type="text" label="Full Name" name="name" onChange={handleChange}/>
                    <Input type="text" label="Voter Id" name="id" onChange={handleChange}/>
                    <Input type="text" label="Phone Number" name="number" onChange={handleChange}/>
                    <Input type="password" label="Password" name="password" onChange={handleChange}/>
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