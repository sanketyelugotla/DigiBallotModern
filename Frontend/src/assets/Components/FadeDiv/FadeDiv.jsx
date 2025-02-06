import React, { useEffect, useState } from 'react';
import StyleFadediv from "./FadeDiv.module.css";
import classNames from 'classnames';

export default function FadeDiv({ children, fade_in, fade_out, onChange }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (fade_in) {
            setIsVisible(true);
        }
    }, [fade_in]);

    function handleChange() {
        if (fade_out) {
            setTimeout(() => {
                onChange();
                setIsVisible(false);
            }, 300);
        } else {
            onChange();
        }
    }

    const allClasses = classNames(
        StyleFadediv.fadeDiv,
        isVisible && fade_in && StyleFadediv.fade_in,
        fade_out && StyleFadediv.fade_out
    );

    return (
        <div className={allClasses}>
            {children({ handleChange })}
        </div>
    );
}
