import { useState, useEffect } from "react";
import classNames from "classnames";
import "./HoverDiv.css";

export default function HoverDiv({ children, onClose, className, variant, ...rest }) {
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsOpening(true), 10);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("login-overlay")) {
            handleClose();
        }
    };

    const allClasses1 = classNames(className, `login-overlay ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`);
    const allClasses2 = classNames(variant && `hoverdiv-${variant}`, `login-modal ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`);

    return (
        <div className={allClasses1} onClick={handleOverlayClick} {...rest}>
            <div className={allClasses2}>
                {children({ handleClose })}
            </div>
        </div>
    );
}
