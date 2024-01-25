import { AppError } from "../error";
import { IAsk } from "../interfaces/asks.Interfaces";
import AskService from "../services/ask.Service";
import { Request, Response } from "express"
import LinkService from "../services/link.service";

class LinkController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const Link: { id: string, link: string } = await LinkService.create(req.body);
            return res.status(201).json(Link)
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
            const links = await LinkService.getAll()
            return res.status(200).json(links)
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

    static async update(req: Request, res: Response): Promise<Response> {
        try {

            const data = await LinkService.updatedLink(req.params.id, req.body)
            return res.status(200).json(data)
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


export default LinkController
