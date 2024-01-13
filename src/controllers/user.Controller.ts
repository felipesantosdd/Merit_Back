import { AppError } from "../error"
import { Request, Response } from "express"
import UserService from "../services/user.Service"
import { INewUserResponse, IUser } from "../interfaces/user.Interfaces"

class UserController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const user: INewUserResponse = await UserService.create(req.body)
            return res.status(201).json(user)
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
    static async getTopUsers(req: Request, res: Response): Promise<Response> {
        try {
            const user: IUser[] = await UserService.getTopUsers(req.body.appName)
            return res.status(201).json(user)
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

    static async recruiting(req: Request, res: Response): Promise<Response> {
        try {
            const user: INewUserResponse = await UserService.recruiting(req.params.id, req.body)
            return res.status(201).json(user)
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
            const users: { totalPages: number, currentPage: number, nextPage: number | null, prevPage: number | null } = await UserService.getAll(req.query)
            return res.status(200).json(users)
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

    static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const user: INewUserResponse = await UserService.getById(
                req.params.id
            )
            return res.status(200).json(user)
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

    static async getByAppId(req: Request, res: Response): Promise<Response> {
        try {
            const user: INewUserResponse = await UserService.getByAppId(
                req.params.id
            )
            return res.status(200).json(user)
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

    static async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = await UserService.login(req.body)
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

    static async updateUser(req: Request, res: Response): Promise<Response> {
        try {

            const data = await UserService.updatedUser(req.params.id, req.body)
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

    static async uploadImage(req: Request, res: Response): Promise<void | any> {
        try {
            const response = await UserService.uploadImage(req)

            return res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }

    }
    static async uploadPrint(req: Request, res: Response): Promise<void | any> {
        try {
            const response = await UserService.sendPrint(req)

            return res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }

    }
    static async uploadDocumentFront(req: Request, res: Response): Promise<void | any> {
        try {
            const response = await UserService.sendDocumentFront(req)

            return res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }

    }
    static async uploadDocumentBack(req: Request, res: Response): Promise<void | any> {
        try {
            const response = await UserService.sendDocumentBack(req)

            return res.status(200).send(response)
        } catch (error) {
            console.log(error)
        }

    }



}

export default UserController
