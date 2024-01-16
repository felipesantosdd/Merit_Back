import { AppDataSource } from "../data-source"
import { classToPlain } from 'class-transformer';
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

    static async getTopUsers(appName: string): Promise<IUser[]> {
        const topUsers = await this.userRepository.find({
            where: { app_name: appName },
            take: 10,
            order: {
                ranking: 'DESC', // Isso ordenará do maior para o menor ranking
            },
        });

        return topUsers;
    }

    static async recruiting(userId: string, newUserData: INewUserRequest): Promise<any> {
        const emailUsed = await this.userRepository.findOne({
            where: { email: newUserData.email }
        })

        if (emailUsed) {
            throw new AppError("Este email já está sendo usado", 409)
        }

        const user = await this.userRepository.findOne({
            where: { id: userId }
        })

        if (!user) {
            throw new AppError('Este Link não é mais valido')
        }


        newUserData.nome.toLowerCase()

        const salt = genSaltSync(10)
        newUserData.password = hashSync(newUserData.password, salt)
        const newUser = this.userRepository.create(newUserData)

        newUser.manager = user

        await this.userRepository.save(newUser)

        if (user.recruits === undefined) {
            user.recruits = []
        }

        user.recruits.push(newUser)
        await this.userRepository.save(user)

        const userWithoutCircularReferences = classToPlain(newUser);

        return userWithoutCircularReferences
    }

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

    static async getAll(query: any): Promise<{ users: IUser[], totalPages: number, currentPage: number, nextPage: number | null, prevPage: number | null }> {
        const page: number = Number(query.page) || 1;
        const itemsPerPage: number = 5;

        // Calcula o número total de usuários
        const totalUsers = await this.userRepository.count();

        // Calcula o número total de páginas
        const totalPages = Math.ceil(totalUsers / itemsPerPage);

        // Verifica se a página solicitada está dentro dos limites válidos
        if (page < 1 || page > totalPages) {
            throw new Error('Página inválida');
        }

        // Consulta os usuários com paginação
        const users = await this.userRepository.find({
            take: itemsPerPage,
            skip: itemsPerPage * (page - 1),
            order: {
                updatedAt: 'DESC'
            }
        });

        return {
            users: users,
            totalPages: totalPages,
            currentPage: page,
            nextPage: page === totalPages ? null : page + 1,
            prevPage: page === 1 ? null : page - 1
        };
    }

    static async getById(id: string): Promise<INewUserResponse> {
        let user = await this.userRepository.findOne({
            where: { id: id },
            relations: { received: true, manager: true, recruits: true }
        })

        if (!user) {
            throw new AppError("Usuario nao encontrado", 400)
        }

        //  eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...response } = user

        return response
    }

    static async getByAppId(id: string): Promise<INewUserResponse> {
        let user = await this.userRepository.findOne({
            where: { app_id: id },
            relations: { received: true, manager: true, recruits: true }
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
            relations: { received: true, manager: true, sended: true, recruits: true }
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
            manager: user.manager,
            active: user.active,
            balance: user.balance,
            sended: user.sended,
            received: user.received,
            ranking: user.ranking,
            app_name: user.app_name,
            isAdmin: user.isAdmin,
            age: user.age,
            app_id: user.app_id,
            approved: user.approved,
            avatar: user.avatar,
            app_vip: user.app_vip,
            token: token,
            hani_print: user.hani_print,
            document_back: user.document_back,
            document_front: user.document_front,
            is_recruiter: user.is_recruiter,
            recruits: user.recruits,
            stand_by: user.stand_by,
            pix_key: user.pix_key,
            pix_name: user.pix_name,
            pix_type: user.pix_type,
            selfie: user.selfie,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            paymentRequested: user.paymentRequested,
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

            user.updatedAt = new Date()

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
        user.updatedAt = new Date()

        await this.userRepository.save(user)

        return user
    }

    static async sendPrint(req: any) {
        const user = await this.userRepository.findOne({ where: { id: req.params.id } })

        if (!req.file) {
            throw new AppError("Nenhuma Imagem enviada", 400)
        }

        const s3Storage = new S3Storage()

        await s3Storage.saveFile(req.file.filename)

        user.hani_print = `https://dianealmeida-modelos.s3.us-east-2.amazonaws.com/${req.file?.filename}`

        user.stand_by = true
        user.updatedAt = new Date()

        await this.userRepository.save(user)

        return user
    }

    static async sendDocumentFront(req: any) {
        const user = await this.userRepository.findOne({ where: { id: req.params.id } })

        if (!req.file) {
            throw new AppError("Erro ao Enviar Frente do Documento", 400)
        }

        const s3Storage = new S3Storage()

        await s3Storage.saveFile(req.file.filename)

        user.document_front = `https://dianealmeida-modelos.s3.us-east-2.amazonaws.com/${req.file?.filename}`

        user.stand_by = true
        user.updatedAt = new Date()

        await this.userRepository.save(user)

        return user
    }

    static async sendDocumentBack(req: any) {
        const user = await this.userRepository.findOne({ where: { id: req.params.id } })

        if (!req.file) {
            throw new AppError("Erro ao Enviar Verso  do Documento", 400)
        }

        const s3Storage = new S3Storage()

        await s3Storage.saveFile(req.file.filename)

        user.document_back = `https://dianealmeida-modelos.s3.us-east-2.amazonaws.com/${req.file?.filename}`

        user.stand_by = true
        user.updatedAt = new Date()

        await this.userRepository.save(user)

        return user
    }

    static async sendSelfie(req: any) {
        const user = await this.userRepository.findOne({ where: { id: req.params.id } })

        if (!req.file) {
            throw new AppError("Erro ao Enviar Selfie", 400)
        }

        const s3Storage = new S3Storage()

        await s3Storage.saveFile(req.file.filename)

        user.selfie = `https://dianealmeida-modelos.s3.us-east-2.amazonaws.com/${req.file?.filename}`

        user.stand_by = true
        user.updatedAt = new Date()

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
