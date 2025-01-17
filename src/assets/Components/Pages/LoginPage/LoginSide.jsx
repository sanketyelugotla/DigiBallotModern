import Input from "../../Input/Index"

export default function LoginSide({ changeSide, handleLogin }) {
    return (
        <>
            <h2 className="topLogin">Log in to shape the future!!!</h2>
            <Input.Div>
                <Input.Header>Login</Input.Header>
                <Input.Form onSubmit={handleLogin} action="" method="post" >
                    <Input type="text" label="Voter Id" />
                    <Input type="password" label="Password" />
                    <div className="link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <Input.Submit>Login</Input.Submit>
                </Input.Form>
            </ Input.Div>
            <p className="createAccount">
                Create an account? <span onClick={changeSide}>Sign Up</span>
            </p>
        </>
    )
}