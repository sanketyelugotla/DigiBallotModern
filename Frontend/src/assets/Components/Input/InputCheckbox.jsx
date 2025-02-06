import { useState } from "react"
import { IoIosCheckbox } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";
import classNames from "classnames";

export default function InputCheckbox({ children, className, ...rest }) {

    const [isChecked, setIsChecked] = useState(false)

    function changeChecked() {
        setIsChecked(!isChecked)
    }

    const allClasses = classNames("terms", className)

    return (
        <div onClick={changeChecked} className={allClasses} {...rest}>
            <input type="checkbox" name="terms" required/>
            <label className="termsp">I agree to the terms & conditions</label><br></br>
        </div>
    )
}