import { IUser } from "./user.Interfaces"

export interface IWarning {
    id: string
    title: string
    text: string
    app_name: string
    image: string | null
    createdAt: Date
}

export interface INewWarning {
    title: string
    text: string
    app_name: string
    image: string | null
}
