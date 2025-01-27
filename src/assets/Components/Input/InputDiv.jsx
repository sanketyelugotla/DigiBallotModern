import classNames from "classnames";

export default function InputDiv({ children, className, ...rest }) {
    const allClasses = classNames("loginForm", className)
    
    return (
        <div className={allClasses} {...rest}>
            {children}
        </div>
    )
}