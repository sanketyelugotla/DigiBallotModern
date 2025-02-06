import classNames from "classnames"

export default function Submit({ children, className, variant, ...rest }) {
    const allClasses = classNames(
        "formButton", 
        className,
        variant && variant
    )
    return (
        <button className={allClasses} {...rest}>{children}</button>
    )
}