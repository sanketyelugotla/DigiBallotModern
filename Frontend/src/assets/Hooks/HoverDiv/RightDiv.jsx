export default function RightDiv({ isLeft }) {
    return (
        <img src="./pics/voteMe.png" className={`${isLeft ? "" : "signupActive"}`} alt="voteMe" />
    );
}
