export default function Input({ children, type, label }) {
    return (
        <div className="inputField">
            <input type={type} required />
            <label>{label}</label>
        </div>
    )
}