import "./Button.css"
import classNames from "classnames"

export default function Button({ children, className, size, variant, ...rest }) {
    const allClasses = classNames(size && `button-${size}`, variant && `button-${variant}`)
    return (
        <button className={allClasses} {...rest}>{children}</button>
    )
}
