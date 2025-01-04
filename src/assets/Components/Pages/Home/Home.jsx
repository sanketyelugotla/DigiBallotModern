import "./Home.css"
import Button from "../../Button/Button"
import Login from "../Login/Login";

import { useState, useRef } from "react"

export default function Home() {

    const [isOpen, setOpen] = useState(false);
    const collapsibleRef = useRef(null);

    const handleClick = () => {
        const element = collapsibleRef.current;

        if (isOpen) {
            element.style.height = "0px";
            element.style.padding = "0px";
        } else {
            element.style.height = `${element.scrollHeight + 10}px`;
            element.style.padding = "10px";
        }
        setOpen(!isOpen);
    };

    return (
        <div className="space">
            <div className="homebg">
                <p>Empowering Democracy <br />
                    With <span>India's</span> Online Voting <br />
                    System.
                    <Button onClick={handleClick} size="lg">How it works</Button>
                </p>
                <img className="vote" src="./pics/voteIndia.png" alt="Vote india" />
            </div>
            <div className="collapsible" ref={collapsibleRef}>
                <div className="about">
                    <h1>About</h1>
                    <p>
                        The Indian Online Voting System is a cutting-edge platform designed to simplify and modernize the voting process for citizens, candidates, and administrators. By leveraging advanced technology, the app ensures secure, transparent, and efficient elections, enabling voters to cast their ballots remotely and candidates to manage their campaigns seamlessly. With features like real-time updates, multilingual support, and robust security measures, the app is built to make voting accessible and trustworthy for everyone. It represents a step forward in strengthening democracy by fostering greater participation and reducing the challenges of traditional voting methods.
                    </p>
                </div>
                <div className="about">
                    <h1>Our Mission</h1>
                    <ul>
                        <li>Provide a seamless and secure voting experience for all citizens.</li>
                        <li>Ensure transparency, fairness, and reliability in the electoral process.</li>
                        <li>Support candidates with efficient tools to manage their campaigns.</li>
                        <li>Assist administrators in overseeing elections with real-time data and insights.</li>
                    </ul>
                </div>
            </div>
            <div className="options">
                <h1>Your Vote, Your Voice: Login to Participate</h1>
                <div className="boxes">
                    <div className="box right-box">
                        <img src="./pics/voteMachine.png" alt="voteMachine" />
                        <p>
                            Log in to cast your vote and participate in the election
                        </p>
                        <Button variant="light">Voter Login</Button>
                    </div>
                    <div className="box right-box">
                        <img className="lg" src="./pics/profile.png" alt="voteMachine" />
                        <p>
                            Log in to manage your profile and election details
                        </p>
                        <Button variant="light">Candidate Login</Button>
                    </div>
                    <div className="box">
                        <img className="lg" src="./pics/admin_profile.png" alt="voteMachine" />
                        <p>
                            Log in to manage elections and monitor voting activity
                        </p>
                        <Button variant="light">Admin Login</Button>
                    </div>
                </div>
            </div>
            <div className="angels">
                <div>
                    <img src="./pics/angel.jpg" alt="angel.jpg" />
                    <h3>Registered Voters</h3>
                    <h1>2 M</h1>
                </div>
                <div className="black"></div>
                <div>
                    <img className="lg" src="./pics/waiter.png" alt="waiter.png" />
                    <h3>Elections Conducted</h3>
                    <h1>10 +</h1>
                </div>
            </div>
        </div >
    )
}