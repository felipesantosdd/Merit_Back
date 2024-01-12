import { AppDataSource } from "../data-source";
import Ask from "../entities/asks";
import { AppError } from "../error";
import { IAsk, INewAsk } from "../interfaces/asks.Interfaces";

class AskService {

    static askRepository = AppDataSource.getRepository(Ask)

    static async create(data: INewAsk): Promise<IAsk> {
        const alreadySended = await this.askRepository.findOne({
            where: {
                title: data.title
            }
        })

        if (alreadySended) {
            throw new AppError("Ja existe uma questão com esse nome...")
        }

        data.title.toLowerCase()

        const newInscription = this.askRepository.save(data)
        return newInscription

    }

    static async getAll(): Promise<IAsk[]> {
        return await this.askRepository.find()
    }

    static async delete(id: string): Promise<void> {
        const ask = await this.askRepository.findOne({
            where: { id: id }
        })

        if (!ask) {
            throw new AppError("ask not found", 404)
        }

        await this.askRepository.delete(ask)
        return
    }
}

export default AskService
