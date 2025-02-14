import React, { useEffect, useState } from "react";
import StyleFadediv from "./FadeDiv.module.css";
import classNames from "classnames";

export default function FadeDiv({ children, fade_in, fade_out, onChange, variant, className }) {
    const [isVisible, setIsVisible] = useState(fade_in);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        if (fade_out) {
            setIsFadingOut(true);
            setIsVisible(false);
            setIsFadingOut(false);
        } else if (fade_in && !isFadingOut) {
            setTimeout(() => {
                setIsVisible(true);
            }, 200);
        }
    }, [fade_in, fade_out]);

    function handleChange() {
        if (fade_out) {
            onChange && onChange();
            setIsVisible(false);
            setIsFadingOut(false);
        } else {
            onChange && onChange();
        }
    }

    const allClasses = classNames(
        className,
        StyleFadediv.fadeDiv,
        isVisible ? StyleFadediv.fade_in : StyleFadediv.fade_out,
        variant && StyleFadediv[`fadeDiv_${variant}`]
    );

    return (
        <div className={allClasses}>
            {typeof children === "function" ? children({ handleChange }) : children}
        </div>
    );
}
