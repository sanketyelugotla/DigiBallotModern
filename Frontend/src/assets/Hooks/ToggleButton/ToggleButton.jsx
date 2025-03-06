import style from "./ToggleButton.module.css";

export default function ToggleButton({ isOn, onToggle }) {
    return (
        <div className={`${style.toggleContainer} ${isOn ? style.on : style.off}`} onClick={onToggle}>
            <div className={style.toggleCircle}></div>
        </div>
    );
}