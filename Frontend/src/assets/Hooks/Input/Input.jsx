import classNames from "classnames"
import { useRef, useState } from "react";
import { BiHide } from "react-icons/bi";

export default function Input({ children, type, label, className, ...rest }) {
    const allClasses = classNames("inputField", className);
    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    // --theme2: #D97706;
    // --theme3: #065F46;


    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
        if (inputRef.current) {
            inputRef.current.type = showPassword ? "password" : "text";
        }
    };

    return type === "password" ? (
        <div className={`${allClasses} wrapperr`}>
            <input type="password" required ref={inputRef} {...rest} />
            <label> {label}</label>
            <span onClick={togglePasswordVisibility} className="show-btn"><BiHide /></span>
        </div>
    ) :
        (
            <div className={allClasses}>
                <input type={type}  {...rest} required />
                <label> {label}</label>
            </div >
        )
}
