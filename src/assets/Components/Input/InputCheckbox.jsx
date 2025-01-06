import { useState } from "react"
import { IoIosCheckbox } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";

export default function InputCheckbox({ children }) {

    const [isChecked, setIsChecked] = useState(false)

    function changeChecked() {
        setIsChecked(!isChecked)
    }

    return (
        <div onClick={changeChecked} className="terms">
            <input type="checkbox" name="terms" />
            <label for="terms" className="termsp">I agree to the terms & conditions</label><br></br>
        </div>
    )
}