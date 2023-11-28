import Icon, {AppIcons} from "./icon.tsx";
import {FC, useEffect} from "react";
import {createPortal} from "react-dom";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {selectToasterState, setToaster} from "../utils/redux/features/common/commonSlice.ts";
import {useDispatch, useSelector} from "react-redux";

const toasterRootElement = document.querySelector('#toaster')

const ModalToaster: FC = () => {
    const toasterState = useSelector(selectToasterState)
    const dispatch = useDispatch()
    let timer: TimeoutId;

    const handleClose = () => {
        if (timer) {
            clearTimeout(timer)
        }
        setTimeout(() => {
            dispatch(setToaster({...toasterState, isOpen: false}))
        }, 500)
    }

    useEffect(() => {
        if (toasterState.isOpen) {
            timer = setTimeout(() => {
                handleClose()
            }, 5000)
        }
        console.log(toasterState)
    }, [toasterState.isOpen]);

    return createPortal(
        <>
            {toasterState.message ? <div className={`toaster-dialog ${toasterState.isOpen ? "toaster-slide-in" : "toaster-slide-out"}`}>
                <div className={"toaster-exit"}>
                    <Icon icon={AppIcons.close} onClick={() => handleClose()}/>
                </div>
                <div className={"w-75 pb-1"}>
                    <h3>{toasterState.title}</h3>
                </div>
                <div className={"pt-1"}>
                    {toasterState.message}
                </div>
            </div> : null}
        </>, toasterRootElement!
    )
}

export default ModalToaster