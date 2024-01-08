import { IUser } from "./user.Interfaces"

export interface IInscription {
    id: string
    nome: string
    horas: number
    celular: string
    contato: string
}

export type INewInscription = Pick<IInscription,
    "nome"
    | "horas"
    | "celular"
    | "contato"
>
