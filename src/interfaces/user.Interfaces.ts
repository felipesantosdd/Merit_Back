import { IMessage } from "./message.Interface"

export type IUser = {
    id: string
    nome: string
    sobrenome: string
    email: string // Updated property name
    password?: string // Updated property name
    app_id: string | undefined
    app_name: string | undefined
    recruiter: IUser
    active: boolean
    approved: boolean
    balance: number
    ranking: number
    sended: IMessage[]
    received: IMessage[]
    isAdmin: boolean
    avatar: string
    age: Date
    app_vip: boolean | undefined
}

export type appVipType = {
    nome: string
    horas: number,
    modelo: string
    contato: string
}

export type INewUserRequest = Pick<
    IUser,
    "nome" | "sobrenome" | "email" | "password" | "age"
>

export type INewUserResponse = Pick<
    IUser,
    | "id"
    | "nome"
    | "sobrenome"
    | "email"
    | "recruiter"
    | "active"
    | "balance"
    | "isAdmin"
    | "ranking"
    | "age"
    | "avatar"
    | "approved"
>
export type ILoginRequest = Pick<IUser, "email" | "password">

export type ILoginResponse = Pick<IUser,
    "nome"
    | "sobrenome"
    | "email"
    | "age"
    | "id"
    | "app_id"
    | "app_name"
    | "recruiter"
    | "active"
    | "approved"
    | "balance"
    | "ranking"
    | "sended"
    | "received"
    | "isAdmin"
    | "avatar"
    | "app_vip"> & {
        token: string
    }
