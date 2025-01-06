export default function InputForm({ children, action, method }) {
    return (
        <form action={action} method={method}>
            {children}
        </form>
    )
}