import { IUser } from "./user.Interfaces"

export interface IMessage {
    id: string
    text: string | null
    subject: string | null
    sender: IUser
    recipient: IUser
    isRead: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IMessageRequest {
    text: string | null
    subject: string | null
    sender: string
    recipient: string
}
