import styleButton from "./Button.module.css";
import classNames from "classnames";

export default function Button({ children, className, size, variant, radius, active, hover, ...rest }) {
    const allClasses = classNames(
        styleButton.button,
        size && styleButton[`button-${size}`],
        variant && styleButton[`button-${variant}`],
        radius && styleButton[`button-${radius}`],
        active && styleButton[`button-active`],
        hover && styleButton[`button-${hover}`],
        className
    );

    return (
        <button className={allClasses} {...rest}>{children}</button>
    );
}
