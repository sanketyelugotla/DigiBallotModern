import { useState, useEffect } from "react"

import { IoIosCheckbox } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";

import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";

import { IoCheckbox } from "react-icons/io5";

import classNames from "classnames";

export default function InputCheckbox({
    children,
    className,
    variant,
    size,
    checked: propChecked = false,
    onChange,
    value,
    ...rest
}) {
    const [localChecked, setLocalChecked] = useState(propChecked);

    // Sync local state with prop changes
    useEffect(() => {
        setLocalChecked(propChecked);
    }, [propChecked]);

    function handleChange() {
        const newChecked = !localChecked;
        setLocalChecked(newChecked);
        if (onChange) {
            onChange(value);
        }
    }

    const allClasses = classNames("terms", className)
    const allClasses2 = classNames(
        "termsp",
        variant && `termsp_${variant}`,
        size && `termsp_${size}`
    )

    return (
        <div onClick={handleChange} className={allClasses} {...rest}>
            <label className={allClasses2}>
                {/* <input type="checkbox" name="terms" required checked={localChecked} /> */}
                {localChecked ? <ImCheckboxChecked className="checkbox" /> : <ImCheckboxUnchecked className="checkbox" />}
                {children}
            </label>
        </div>
    )
}