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
}

const ElevatedButton = ({label, style, onClick, disabled = false}: ElevatedButtonType) => {
    return (
        <button onClick={() => onClick()} className={`base-button ${style ?? "green-button"}`} disabled={disabled}>{label}</button>
    )
}

export default ElevatedButton