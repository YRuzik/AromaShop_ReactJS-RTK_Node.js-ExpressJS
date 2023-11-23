import {ICartEntity} from "./icommon.ts";

export interface IUser {
    id?: string
    name: string
    surname: string
    patronymic?: string
    login: string
    password: string
    email: string
    role: string
}

export interface IUserLogin {
    login: string;
    password: string;
}

export interface IUserValidation {
    user_id: string;
    password: string;
}

export interface IAuth {
    user: IUser
    accessToken: string
}

export interface IOrderCreation {
    order_json: string
    user_id: string
}

export interface IOrder {
    order_id: string
    user_id: string
    order_json: ICartEntity[]
    order_name: string
    order_status: string
    stamp: string
}