export interface IUser {
    name: string
    surname: string
    patronymic?: string
    login: string
    password: string
    email: string
}

export interface IUserLogin {
    identity: string;
    password: string;
}

export interface IAuth {
    user: IUser
    token: string
}