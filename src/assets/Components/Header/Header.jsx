import { useState } from "react"
import Button from "../Button/Button.jsx"
import "./Header.css"

export default function Header() {

    const [logged, setLogged] = useState(false)
    const comp = logged
        ? <li className="link">Constituency</li>
        : <Button variant="light">Login</Button>

    return (
        <header>
            <nav>
                <span className="logo link">Digi Ballot</span>
                <li>Home</li>
                <li>Candidates</li>
                <li>FAQ</li>
                <li>Contact</li>
                {/* <input type="text" /> */}
                {comp}
            </nav>
        </header>
    )
}