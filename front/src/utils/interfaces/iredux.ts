import {IUser} from "./iuser.ts";

export interface IInitState {
    user: IUser | null
    token: string | null
}