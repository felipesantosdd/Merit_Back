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

    static async getAll(query: any): Promise<{ messages: IMessage[], totalPages: number, currentPage: number, nextPage: number | null, prevPage: number | null }> {
        const page: number = Number(query.page) || 1
        const itemsPerPage: number = 10;

        const totalMessages = await this.messageRepository.count();

        const totalPages = Math.ceil(totalMessages / itemsPerPage);

        if (page < 1 || page > totalMessages) {
            throw new Error('Página inválida');
        }

        const messages = await this.messageRepository.find({
            take: itemsPerPage,
            skip: itemsPerPage * (page - 1),
            order: {
                createdAt: "DESC"
            }
        })

        return {
            messages,
            totalPages,
            currentPage: page,
            nextPage: page === totalPages ? null : page + 1,
            prevPage: page === 1 ? null : page - 1
        };
    }

    static async delete(messageId: string): Promise<void> {
        const message: IMessage = await this.messageRepository.findOne({
            where: { id: messageId }
        })

        if (!message) {
            throw new AppError("Message not found", 404)
        }

        await this.messageRepository.delete(message)
        return
    }
}

export default MessageService
