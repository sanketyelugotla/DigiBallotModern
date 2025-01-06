import Input from "../../Input/Index"

export default function SignupSide({ changeSide }) {
    return (
        <div className="loginHalf">
            <h2 className="topLogin">Log in to shape the future!!!</h2>
            <Input.Div>
                <Input.Header>Login</Input.Header>
                <Input.Form action="" method="post" >
                    <Input type="text" label="Voter Id" />
                    <Input type="password" label="Password" />
                    <div className="link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <Input.Submit>Login</Input.Submit>
                </Input.Form>
            </ Input.Div>
            <p className="createAccount">Create an account? <span onClick={changeSide}>Sign Up</span></p>
        </div>
    )
}