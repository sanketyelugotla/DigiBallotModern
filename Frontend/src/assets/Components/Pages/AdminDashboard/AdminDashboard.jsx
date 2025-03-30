import React, { useContext, useState } from 'react'
import { userContext, databaseContext } from '../../../Hooks/ContextProvider/ContextProvider'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../Hooks';
import Approve from './Approve/Approve';
import styleDash from "./Admin.module.css";
import { sectionsContext } from './AdminProfile/SectionsContextProvider';

export default function AdminDashboard() {
    const { user } = useContext(userContext);
    const { database_url } = useContext(databaseContext);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const { setSections } = useContext(sectionsContext);

    function handleApprove() {
        setIsApproveOpen(!isApproveOpen);
    }
    const navigate = useNavigate();

    function handleNavigateCreateElection() {
        setSections("election");
        navigate("/adminDashboard/profile")
    }

    if (!user) return <h1>Loading Admin details...</h1>;

    return (
        <div>
            {/* <img src={`${database_url}/candidates/candimage/${user._id}`} alt={user.name} className={styleDash.pic} /> */}
            <div className="options">
                <h1>Welcome! <br /> {user.name}</h1>
                <h1>Please select to continue...</h1>
                <div className="boxes">
                    <div className="box right-box">
                        <img src="/pics/voteMachine.png" alt="voteMachine" />
                        <p>Create an election.</p>
                        <div onClick={handleNavigateCreateElection}>
                            <Button variant="light">Create</Button>
                        </div>
                    </div>
                    <div className="box right-box">
                        <img className="lg" src="/pics/profile.png" alt="voteMachine" />
                        <p>Approve candidates and users.</p>
                        <Button variant="light" onClick={handleApprove}>Approve</Button>
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
            {isApproveOpen && <Approve handleApprove={handleApprove} />}
        </div>
    );
}
