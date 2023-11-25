import {FC} from "react";
import Icon, {AppIcons} from "./icon.tsx";

type selectableTextProps = {
    label: string;
    isSelected: boolean;
    onClick(): void;
}
const SelectableText: FC<selectableTextProps> = ({label, isSelected, onClick}) => {
    return (
        <div onClick={() => onClick()} className={`f-container flexbox-line al-i-c ${isSelected ? "f-container-active" : null}`}>
            {isSelected ? <Icon icon={AppIcons.circle} size={10}/> : null}{label}
        </div>
    )
}

export default SelectableText