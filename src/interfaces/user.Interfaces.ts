import { IMessage } from "./message.Interface"

export type IUser = {
    id: string
    nome: string
    sobrenome: string
    email: string // Updated property name
    password?: string // Updated property name
    app_id: string | undefined
    app_name: string | undefined
    manager: IUser
    active: boolean
    approved: boolean
    balance: number
    ranking: number
    sended: IMessage[]
    received: IMessage[]
    isAdmin: boolean
    avatar: string
    age: Date
    app_vip: boolean | undefined,
    hani_print: string | undefined
    document_back: string | undefined
    document_front: string | undefined
    recruits: IUser[]
    is_recruiter: boolean
    stand_by: boolean
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
    | "manager"
    | "active"
    | "approved"
    | "balance"
    | "ranking"
    | "sended"
    | "received"
    | "isAdmin"
    | "avatar"
    | "hani_print"
    | "document_back"
    | "document_front"
    | "recruits"
    | "is_recruiter"
    | "stand_by"
    | "app_vip"> & {
        token: string
    }
