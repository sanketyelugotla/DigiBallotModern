export default function InputForm({ children, ...rest }) {
    return (
        <form {...rest}>
            {children}
        </form>
    )
}