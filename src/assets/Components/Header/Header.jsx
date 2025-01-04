import "./Header.css";
import Button from "../Button/Button";

export default function Header({ onLoginClick }) {
    return (
        <header className="header">
            <span className="logo">DigiBallot</span>
            <ul className="nav-list">
                <li>Home</li>
                <li>Candidates</li>
                <li>FAQ</li>
                <li>Contact</li>
                <Button variant="light" onClick={onLoginClick}>
                    Login
                </Button>
            </ul>
        </header>
    );
}
