import classNames from "classnames"

export default function Input({ children, type, label, className, ...rest }) {
    const allClasses = classNames("inputField", className);

    return (
        <div className={allClasses}>
            <input type={type}  {...rest} required />
            <label>{label}</label>
        </div>
    )
}