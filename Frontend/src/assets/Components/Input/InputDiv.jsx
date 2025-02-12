import classNames from "classnames";

export default function InputDiv({ children, className, variant, ...rest }) {
    const allClasses = classNames("loginForm", className)

    return (
        <div className={`${variant && variant}`}>
            <div className={allClasses} {...rest}>
                {children}
            </div>
        </div>
    )
}