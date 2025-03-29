import { useState, useEffect } from "react";
import classNames from "classnames";
import "./HoverDiv.css";

export default function Mini({ children, onClose, className, variant, insideDiv, style, shade, overlayOff, ...rest }) {
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
        if (e.target.classList.contains("login-overlay2")) {
            handleClose();
        }
    };

    const allClasses1 = classNames(
        className,
        `login-overlay2 ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`,
        shade && shade
    );
    const allClasses2 = classNames(variant && `hoverdiv-${variant}`, `login-modal ${isOpening ? "" : "hidden"} ${isClosing ? "hidden" : ""}`, insideDiv && insideDiv);

    return (
        <div className={allClasses1} onClick={handleOverlayClick}>
            <div className={allClasses2} style={style} {...rest}>
                {children({ handleClose })}
            </div>
        </div>
    );
}
