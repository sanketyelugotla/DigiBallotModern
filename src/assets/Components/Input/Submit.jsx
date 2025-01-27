import classNames from "classnames"

export default function Submit({ children, className, ...rest }) {
    const allClasses = classNames("formButton", className)
    return (
        <button className={allClasses} {...rest}>{children}</button>
    )
}