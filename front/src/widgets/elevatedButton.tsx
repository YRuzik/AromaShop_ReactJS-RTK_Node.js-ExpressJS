export enum ButtonStyles {
    green = "green-button",
    purple = "purple-button",
    black = "black-button",
    white = "white-button"
}

type ElevatedButtonType = {
    label?: string;
    style?: ButtonStyles;
    onClick: Function;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}

const ElevatedButton = ({label, style, onClick, disabled = false, type}: ElevatedButtonType) => {
    return (
        <button onClick={() => onClick()} type={type ?? "button"} className={`base-button ${style ?? "green-button"}`} disabled={disabled}>{label}</button>
    )
}

export default ElevatedButton