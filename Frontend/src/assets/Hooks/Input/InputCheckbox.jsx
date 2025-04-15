import { useState, useEffect } from "react"

import { IoIosCheckbox } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";

import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";

import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

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
    const allClasses3 = classNames("checkbox", variant && `checkbox_${variant}`, size && `termsp_${size}`)

    return (
        <div onClick={handleChange} className={allClasses} {...rest}>
            <label className={allClasses2}>
                {/* <input type="checkbox" name="terms" required checked={localChecked} /> */}
                {/* {localChecked ? <ImCheckboxChecked className="checkbox" /> : <ImCheckboxUnchecked className="checkbox" />} */}
                {localChecked ? <MdCheckBox className={allClasses3} /> : <MdCheckBoxOutlineBlank className={allClasses3} />}
                {children}
            </label>
        </div>
    )
}