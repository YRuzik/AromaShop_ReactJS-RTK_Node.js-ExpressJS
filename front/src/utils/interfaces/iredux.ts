import {IUser} from "./iuser.ts";
import {ICartEntity} from "./icommon.ts";

export interface IInitState {
    user: IUser | null
    token: string | null
}

export interface IInitCommon {
    cart: ICartEntity[]
    toasterState: {
        isOpen: boolean
        title: string
        message: string
    }
}