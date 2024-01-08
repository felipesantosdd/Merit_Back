import { AppError } from "../error";
import { IInscription, INewInscription } from "../interfaces/inscriptions.interfaces";
import InscriptionService from "../services/inscription.Service";
import { Request, Response } from "express"

class InscriptionController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const subscription: IInscription = await InscriptionService.create(req.body);
            return res.status(201).json(subscription)
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
            const subscriptions = await InscriptionService.getAll()
            return res.status(200).json(subscriptions)
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
            await InscriptionService.delete(req.params.id)
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


export default InscriptionController
