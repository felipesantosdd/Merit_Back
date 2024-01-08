import { AppDataSource } from "../data-source"
import User from "../entities/user.Entity"
import { AppError } from "../error"
import {
    ILoginRequest,
    ILoginResponse,
    INewUserRequest,
    INewUserResponse,
    IUser
} from "../interfaces/user.Interfaces"
import { compare, genSaltSync, hashSync } from "bcryptjs"
import jwt from "jsonwebtoken"
import S3Storage from "../utils/S3Storage"
import { Request } from "express"

class UserService {
    static userRepository = AppDataSource.getRepository(User)

    static async create(newUserData: INewUserRequest): Promise<IUser> {
        const emailUsed = await this.userRepository.findOne({
            where: { email: newUserData.email }
        })

        if (emailUsed) {
            throw new AppError("Este email já está sendo usado", 409)
        }

        newUserData.nome.toLowerCase()

        const salt = genSaltSync(10)
        newUserData.password = hashSync(newUserData.password, salt)
        const newUser = this.userRepository.create(newUserData)

        await this.userRepository.save(newUser)

        return newUser
    }

    static async getAll(): Promise<IUser[]> {
        const users = await this.userRepository.find()
        if (users.length <= 0) {
            throw new AppError("Ainda sem usuarios cadastrados", 404)
        } else if (!users) {
            throw new AppError("Algo deu errado", 400)
        }
        return users
    }

    static async getById(id: string): Promise<INewUserResponse> {
        let user = await this.userRepository.findOne({
            where: { id: id }
        })

        if (!user) {
            throw new AppError("Usuario nao encontrado", 400)
        }

        //  eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...response } = user

        return response
    }

    static async login(data: ILoginRequest): Promise<ILoginResponse> {
        const user = await this.userRepository.findOne({
            where: {
                email: data.email
            },
            relations: ["received", "sended"]
        })
        if (!user) {
            throw new AppError("Usuário e/ou senha inválidos", 401)
        }

        const passwordMatch = await compare(data.password, user.password)

        if (!passwordMatch) {
            throw new AppError("Usuário e/ou senha inválidos", 401)
        }

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
            subject: user.id,
            expiresIn: "24h"
        })

        const response: ILoginResponse = {
            id: user.id,
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
            recruiter: user.recruiter,
            active: user.active,
            balance: user.balance,
            sended: user.sended,
            received: user.received,
            ranking: user.ranking,
            app_name: user.app_name,
            isAdmin: user.isAdmin,
            age: user.age,
            app_id: user.app_id,
            approved: user.approved, // Adicione as propriedades ausentes
            avatar: user.avatar,
            app_vip: user.app_vip,
            token: token,
        };


        return response
    }

    static async updatedUser(userId: string, data: any) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId }
            })
            if (!user) {
                throw new AppError("User not found", 404)
            }

            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    if (key in user) {
                        user[key] = data[key]
                    }
                }
            }

            await this.userRepository.save(user)

            return user

        } catch (error) {
            console.error(error)
        }
    }

    static async uploadImage(req: any) {


        const user = await this.userRepository.findOne({ where: { id: req.params.id } })

        if (!req.file) {
            throw new AppError("Nenhuma Imagem enviada", 400)
        }

        const s3Storage = new S3Storage()

        await s3Storage.saveFile(req.file.filename)

        user.avatar = `https://dianealmeida-modelos.s3.us-east-2.amazonaws.com/${req.file?.filename}`

        await this.userRepository.save(user)

        return user
    }

    static async getImage(name: string) {
        try {
            const s3Storage = new S3Storage();
            const fileBuffer = await s3Storage.getFile(name);

            // Se o arquivo não for encontrado, a função getFile já lançará um erro
            // Portanto, aqui podemos assumir que o arquivo foi encontrado com sucesso

            // Converter o buffer em um Blob
            const blob = new Blob([fileBuffer], { type: 'application/octet-stream' });

            // Criar uma URL para o Blob
            const imageUrl = URL.createObjectURL(blob);

            return imageUrl;
        } catch (error) {
            console.log(error);
            return null; // Retorna null em caso de erro
        }
    }

}

export default UserService
