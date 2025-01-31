import "./Button.css"
import classNames from "classnames"

export default function Button({ children, className, size, variant, radius, active, ...rest }) {    
    const allClasses = classNames(size && `button-${size}`, variant && `button-${variant}`, radius && `button-${radius}`, active && `button-active`)
    return (
        <button className={allClasses} {...rest}>{children}</button>
    )
}
