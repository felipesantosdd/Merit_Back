import { AppError } from "../error";
import { IAsk } from "../interfaces/asks.Interfaces";
import AskService from "../services/ask.Service";
import { Request, Response } from "express"

class AskController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const ask: IAsk = await AskService.create(req.body);
            return res.status(201).json(ask)
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
            const asks = await AskService.getAll()
            return res.status(200).json(asks)
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
            await AskService.delete(req.params.id)
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


export default AskController
