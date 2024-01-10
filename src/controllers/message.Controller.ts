import { AppError } from "../error";
import { IMessage } from "../interfaces/message.Interface";
import InscriptionService from "../services/inscription.Service";
import { Request, Response } from "express"
import MessageService from "../services/message.Service";

class MessageController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const newMessage: IMessage = await MessageService.create(req.body);
            return res.status(201).json(newMessage)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                })
            } else {
                return res.status(400).json({ erro: error.message })
            }

        }
    }

    static async getAll(req: Request, res: Response): Promise<Response> {

        try {
            const messages = await MessageService.getAll()
            return res.status(200).json(messages)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                })
            } else {
                return res.status(400).json({ erro: error.message })
            }

        }

    }

    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            await MessageService.delete(req.params.id)
            return res.status(200).send()
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                })
            } else {
                return res.status(400).json({ erro: error.message })
            }

        }
    }
}


export default MessageController
