import { AppDataSource } from "../data-source";
import TextVip from "../entities/inscription";
import Message from "../entities/message.Entity";
import User from "../entities/user.Entity";
import { AppError } from "../error";
import { INewInscription, IInscription } from "../interfaces/inscriptions.interfaces";
import { IMessage, IMessageRequest } from "../interfaces/message.Interface";

class MessageService {

    static messageRepository = AppDataSource.getRepository(Message)
    static userRepository = AppDataSource.getRepository(User)

    static async create(data: IMessageRequest): Promise<IMessage> {
        const sender = await this.userRepository.findOne({
            where: {
                id: data.sender
            }
        })

        const recipient = await this.userRepository.findOne({
            where: {
                id: data.recipient
            }
        })

        if (!sender || !recipient) {
            throw new AppError("Erro ao Buscar Usuario")
        }

        const newMessage = {
            subject: data.subject,
            text: data.text,
            sender: sender,
            recipient: recipient
        }

        const response = this.messageRepository.save(newMessage)
        return response

    }

    static async getAll(userId: string): Promise<IMessage[]> {
        return await this.messageRepository.find()
    }

    static async delete(userId: string): Promise<void> {
        // const message: IMessage[] = await this.messageRepository.find({

        //     relations: { recipient: true, sender: true }
        // })

        // if (!message) {
        //     throw new AppError("Message not found", 404)
        // }

        // await this.messageRepository.delete(message)
        return
    }
}

export default MessageService
