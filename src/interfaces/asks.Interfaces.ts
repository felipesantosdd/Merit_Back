import { IUser } from "./user.Interfaces"

export interface IAsk {
    id: string
    title: string
    response: string
}

export type INewAsk = Pick<IAsk,
    "title"
    | "response"
>
