import style from "./UserDashboard.module.css";
import { Button } from "../../../Hooks/index";
import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { stateContext } from "../../../Hooks/ContextProvider/ContextProvider";

export default function Logged() {
    const { presentState } = useContext(stateContext);

    if (presentState != "userDashboard") {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <img src="./pics/India_vote.jpg" alt="" className={style.india} />
            <div className="options">
                <h1>Welcome! <br /> Sanket Yelugotla</h1>
                <h1>Please select to continue...</h1>
                <div className="boxes">
                    <div className="box right-box">
                        <img src="./pics/voteMachine.png" alt="voteMachine" />
                        <p>
                            Your voice shapes the nation. <br /> Ready to vote?
                        </p>
                        <Link to="/instructions">
                            <Button variant="light">
                                Vote Now
                            </Button>
                        </Link>
                    </div>
                    <div className="box right-box">
                        <img className="lg" src="./pics/profile.png" alt="voteMachine" />
                        <p>
                            Know about Candidates and their manifests
                        </p>
                        <Link to="/candidateDetails">
                            <Button variant="light">
                                Candidate Details
                            </Button>
                        </Link>
                    </div>
                    <div className="box">
                        <img className="lg" src="./pics/admin_profile.png" alt="voteMachine" />
                        <p>
                            See the live results of the election.
                        </p>
                        <Link>
                            <Button variant="light">
                                View Results
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
