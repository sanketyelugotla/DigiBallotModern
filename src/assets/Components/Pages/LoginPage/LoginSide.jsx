import Input from "../../Input/Index"

export default function LoginSide({ changeSide, handleLogin }) {
    return (
        <>
            <h2 className="topLogin">Log in to shape the future!!!</h2>
            {/* <Input.Div>
                <Input.Header>Login</Input.Header>
                <Input.Form onSubmit={handleLogin} action="" method="post" >
                    <Input type="text" label="Voter Id" />
                    <Input type="password" label="Password" />
                    <div className="link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <Input.Submit>Login</Input.Submit>
                </Input.Form>
            </ Input.Div> */}
             <div className="inputDiv">
                <h3 className="inputHeader">Login</h3>
                <form onSubmit={handleLogin} action="" method="post" className="inputForm">
                    <div className="inputField">
                        <label htmlFor="voterId">Voter Id</label>
                        <input type="text" id="voterId" name="voterId" required />
                    </div>
                    <div className="inputField">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="submitButton">Login</button>
                </form>
            </div>

            <p className="createAccount">
                Create an account? <span onClick={changeSide}>Sign Up</span>
            </p>
        </>
    )
}