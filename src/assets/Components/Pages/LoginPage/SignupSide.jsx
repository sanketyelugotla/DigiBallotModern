import Input from "../../Input/Index"

export default function SignupSide({ changeSide, isLeft }) {
    return (
        <>
            <h2 className="topLogin">Sign Up and make your voice heard!!!</h2>
            <Input.Div>
                <Input.Header>Sign Up</Input.Header>
                <Input.Form action="" method="post" >
                    <Input type="text" label="Full Name" />
                    <Input type="text" label="Voter Id" />
                    <Input type="text" label="Phone Number" />
                    <Input type="password" label="Password" />
                    <Input.checkbox>Agree to the terms & conditions</Input.checkbox>
                    <Input.Submit>Login</Input.Submit>
                </Input.Form>
            </ Input.Div>
            <p className="createAccount">
                Already have an account? <span onClick={changeSide}>Login</span>
            </p>
        </>
    )
}