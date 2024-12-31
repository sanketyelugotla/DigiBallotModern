import "./Footer.css"
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            <div className="foot-sec">
                <span className="logo">Digi Ballot</span>
                <div>
                    <h2>Quick Links</h2>
                    <div>
                        <p>Home</p>
                        <p>Login Voter, Candidate, Admin</p>
                        <p>FAQ</p>
                        <p>How It Works</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                    </div>
                </div>
                <div>
                    <h2>Contact Us</h2>
                    <div>
                        <p>Helpline: 1800-123-4567</p>
                        <p>Email: support@indianVoting.gov.in</p>
                    </div>
                </div>
                <div>
                    <h2>Social Media</h2>
                    <div className="social">
                        <p className="social-icon"><FaFacebookF /></p>
                        <p className="social-icon"><RiInstagramFill /></p>
                        <p className="social-icon"><FaTwitter /></p>
                        <p className="social-icon"><FaYoutube /></p>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="copyRights">
                <p>© 2024 Indian Online Voting System. All Rights Reserved</p>
            </div>
        </footer>
    )
}