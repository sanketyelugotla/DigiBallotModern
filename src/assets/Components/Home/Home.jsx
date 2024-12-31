import "./Home.css"
import Button from "../Button/Button"

export default function Home() {
    return (
        <div className="space">
            <div className="homebg">
                <p>Empowering Democracy <br />
                    With <span>India's</span> Online Voting <br />
                    System.
                    <Button size="lg">How it works</Button>
                </p>
                <img className="vote" src="./pics/voteIndia.png" alt="Vote india" />
            </div>
            <div className="about">
                <h1>About</h1>
                <p>
                    The Indian Online Voting System is a cutting-edge platform designed to simplify and modernize the voting process for
                    citizens, candidates, and administrators. By leveraging advanced technology, the app ensures secure, transparent, and
                    efficient elections, enabling voters to cast their ballots remotely and candidates to manage their campaigns seamlessly With
                    features like real-time updates, multilingual support, and robust security measures, the app is built to make voting accessible
                    and trustworthy for everyone. It represents a step forward in strengthening democracy by fostering greater participation and
                    reducing the challenges of traditional voting methods.
                </p>
            </div>
            <div className="about">
                <h1>Our Mission</h1>
                <ul>
                    <li>
                        Provide a seamless and secure voting experience for all citizens.
                    </li>
                    <li>
                        Ensure transparency, fairness, and reliability in the electoral process.
                    </li>
                    <li>
                        Support candidates with efficient tools to manage their campaigns.
                    </li>
                    <li>
                        Assist administrators in overseein elections with real-time data and insights.
                    </li>
                </ul>
            </div>
            <div className="options">
                <h1>Your Vote, Your Voice: Login to Participate</h1>
                <div className="boxes">
                    <div className="box">
                        <img src="./pics/voteMachine.png" alt="voteMachine" />
                        <p>
                            Log in to cast your vote and participate in the election
                        </p>
                        <Button variant="light">Voter Login</Button>
                    </div>
                    <div className="box">
                        <img src="./pics/voteMachine.png" alt="voteMachine" />
                        <p>
                            Log in to manage your profile and election details
                        </p>
                        <Button variant="light">Candidate Login</Button>
                    </div>
                    <div className="box">
                        <img src="./pics/voteMachine.png" alt="voteMachine" />
                        <p>
                            Log in to manage elections and monitor voting activity
                        </p>
                        <Button variant="light">Admin Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}