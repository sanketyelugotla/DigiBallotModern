import "./Button.css"
import classNames from "classnames"

export default function Button({ children, className, size, variant, radius, ...rest }) {
    const allClasses = classNames(size && `button-${size}`, variant && `button-${variant}`, radius && `button-${radius}`)
    return (
        <button className={allClasses} {...rest}>{children}</button>
    )
}
