import React from 'react';
import StyleFadediv from "./FadeDiv.module.css";
import classNames from 'classnames';

export default function FadeDiv({ children, fade_in, fade_out, onChange }) {
    const allClasses = classNames(
        StyleFadediv.fadeDiv,
        fade_in && StyleFadediv.fade_in,
        fade_out && StyleFadediv.fade_out
    );

    function handleChange() {
        setTimeout(() => {
            onChange();
        }, 300);
    }

    return (
        <div className={allClasses}>
            {children({ handleChange })}
        </div>
    );
}
