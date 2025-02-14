export default function InputForm({ children, className, ...rest }) {
    return (
        <form className={className} {...rest}>
            {children}
        </form>
    )
}