import "./Logged.css"
import Button from "../Button/Button"

export default function Logged() {
    return (
        <div className="home">
            <div className="intro">
                <p>Welcome!</p>
                <p>Sanket Yelugotla</p>
            </div>
            <p className="ready">
                "Your voice shapes the nation. Ready to vote?"
            </p>
            <Button size="lg"> Vote Now</Button>
        </div >
    )
}