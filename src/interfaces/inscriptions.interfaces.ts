import { IUser } from "./user.Interfaces"

export interface IInscription {
    id: string
    nome: string
    horas: number
    celular: string
    contato: string
    createdAt: Date

}

export type INewInscription = Pick<IInscription,
    "nome"
    | "horas"
    | "celular"
    | "contato"
>
