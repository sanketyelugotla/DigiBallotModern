import classNames from "classnames"

export default function InputHeader({ children, className, ...rest }) {
    const allClasss = classNames("formHeader", className)
    return (
        <h2 className={allClasss} {...rest}>{children}</h2>
    )
}