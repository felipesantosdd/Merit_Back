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
    createdAt: Date
    sended: IMessage[]
    received: IMessage[]
    isAdmin: boolean
    avatar: string
    age: Date
    app_vip: boolean | undefined,
    hani_print: string | undefined
    document_back: string,
    document_front: string,
    selfie: string,
    recruits: IUser[]
    is_recruiter: boolean
    stand_by: boolean,
    pix_key: string | undefined
    pix_name: string | undefined
    pix_type: string | undefined
    paymentRequested: boolean
    updatedAt: Date
    app_vip_inscription: boolean
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
    | "pix_key"
    | "pix_name"
    | "pix_type"
    | "selfie"
    | "paymentRequested"
    | "updatedAt"
    | "createdAt"
    | "app_vip_inscription"
    | "app_vip"> & {
        token: string
    }
