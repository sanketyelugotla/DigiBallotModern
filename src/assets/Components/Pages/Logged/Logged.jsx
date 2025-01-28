import style from "./Logged.module.css";
import Button from "../../Button/Button";
import { loggedContext } from "../../ContextProvider/ContextProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { stateContext } from "../../ContextProvider/ContextProvider";



export default function Logged() {
    const { presentState } = useContext(stateContext);

    // if (!isLogged) {
    //     return <Navigate to="/" replace />;
    // }

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
                        <Button variant="light">Vote Now</Button>
                    </div>
                    <div className="box right-box">
                        <img className="lg" src="./pics/profile.png" alt="voteMachine" />
                        <p>
                            Know about Candidates and their manifests
                        </p>
                        <Button variant="light">Candidate Details</Button>
                    </div>
                    <div className="box">
                        <img className="lg" src="./pics/admin_profile.png" alt="voteMachine" />
                        <p>
                            See the live results of the election.
                        </p>
                        <Button variant="light">View Results</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
