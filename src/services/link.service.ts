import { AppDataSource } from "../data-source";
import Ask from "../entities/asks";
import Link from "../entities/link.Entity";
import { AppError } from "../error";
import { IAsk, INewAsk } from "../interfaces/asks.Interfaces";

class LinkService {

    static linkRepository = AppDataSource.getRepository(Link)

    static async create(linkData: { link: string }): Promise<{ id: string, link: string } | any> {
        try {
            const newLink = await this.linkRepository.save(linkData);
            return newLink;
        } catch (error) {
            // Aqui você pode lidar com o erro de alguma forma (por exemplo, logar ou lançar novamente)
            console.error("Erro ao criar link:", error);
            throw error;
        }
    }


    static async getAll(): Promise<{ id: string, link: string }[]> {
        return await this.linkRepository.find()
    }

    static async delete(id: string): Promise<void> {
        const ask = await this.linkRepository.findOne({
            where: { id: id }
        })

        if (!ask) {
            throw new AppError("ask not found", 404)
        }

        await this.linkRepository.delete({ id: ask.id })
        return
    }

    static async updatedLink(linkId: string, data: { link: string }) {
        try {
            const link = await this.linkRepository.findOne({
                where: { id: linkId }
            })
            if (!link) {
                throw new AppError("link not found", 404)
            }


            link.link = data.link

            await this.linkRepository.save(link)

            return link

        } catch (error) {
            console.error(error)
        }
    }
}

export default LinkService
