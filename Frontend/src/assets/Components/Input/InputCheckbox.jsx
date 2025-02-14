import { useState } from "react"
import { IoIosCheckbox } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";
import classNames from "classnames";

export default function InputCheckbox({ children, className, variant, size, ...rest }) {

    const [isChecked, setIsChecked] = useState(false)

    function changeChecked() {
        setIsChecked(!isChecked)
    }

    const allClasses = classNames("terms", className)
    const allClasses2 = classNames(
        "termsp",
        variant && `termsp_${variant}`,
        size && `termsp_${size}`
    )
    return (
        <div onClick={changeChecked} className={allClasses} {...rest}>
            <label className={allClasses2}>
                <input type="checkbox" name="terms" required />
                {children}
            </label>
        </div >
    )
}