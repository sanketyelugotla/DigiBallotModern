import "./Button.css"
import classNames from "classnames"

export default function Button({ children, className, size, variant, radius, active, hover, ...rest }) {
    const allClasses = classNames(
        size && `button-${size}`,
        variant && `button-${variant}`,
        radius && `button-${radius}`,
        active && `button-active`,
        hover && `button-${hover}`
    )
    return (
        <button className={allClasses} {...rest}>{children}</button>
    )
}
