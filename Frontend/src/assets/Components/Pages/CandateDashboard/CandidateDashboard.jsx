import React, { useContext } from 'react'
import { userContext, databaseContext } from '../../../Hooks/ContextProvider/ContextProvider'
import { Link } from 'react-router-dom';
import { Button } from '../../../Hooks';
import styleDash from "./CandidateDashboard.module.css";

export default function CandidateDashboard() {
    const { user } = useContext(userContext);
    const { database_url } = useContext(databaseContext);

    if (!user) return <h1>Loading candidate details...</h1>;

    return (
        <div>
            <img src={`${database_url}/candidates/candimage/${user._id}`} alt={user.name} className={styleDash.pic} />
            <div className="options">
                <h1>Welcome! <br /> {user.name}</h1>
                <h1>Please select to continue...</h1>
                <div className="boxes">
                    <div className="box right-box">
                        <img className="lg" src="/pics/profile.png" alt="voteMachine" />
                        <p>Update your Details.</p>
                        <Link to="/candidateDashboard/profile">
                            <Button variant="light">Update</Button>
                        </Link>
                    </div>
                    <div className="box right-box">
                        <img src="/pics/voteMachine.png" alt="voteMachine" />
                        <p>Register for election.</p>
                        <Link to="/candidateDashboard/election">
                            <Button variant="light">Vote Now</Button>
                        </Link>
                    </div>
                    <div className="box">
                        <img className="lg" src="/pics/admin_profile.png" alt="voteMachine" />
                        <p>See the live results of the election.</p>
                        <Link to="/results/election">
                            <Button variant="light">View Results</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
