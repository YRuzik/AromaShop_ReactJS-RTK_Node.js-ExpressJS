import Icon, {AppIcons} from "./icon.tsx";
import {FC, ReactNode, useEffect, useRef} from "react";
import {createPortal} from "react-dom";

type modalDialogProps = {
    onClose(): void,
    isOpen: boolean,
    content: ReactNode
}

const modalRootElement = document.querySelector('#modal')

const ModalDialog: FC<modalDialogProps> = ({onClose, isOpen, content}) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) {
            window.document.body.style.overflow = "hidden"
            const checkOutside = (e: any) => {
                if (e.target?.contains(ref.current) && e.target !== ref.current) {
                    onClose && onClose();
                }
            }
            document.addEventListener('click', checkOutside);
            return () => {
                document.removeEventListener('click', checkOutside)
                window.document.body.style.overflow = "auto"
            }
        }
    }, [onClose, isOpen]);

    return createPortal(
        <>
            {isOpen ? (
                <div className={"modal-dialog-bg"}>
                    <div className={"modal-dialog"} ref={ref}>
                        <div className={"modal-exit"}>
                            <Icon icon={AppIcons.close} onClick={() => onClose()}/>
                        </div>
                        {content}
                    </div>
                </div>
            ) : null}
        </>, modalRootElement!
    )
}

export default ModalDialog