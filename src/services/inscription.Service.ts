import { AppDataSource } from "../data-source";
import TextVip from "../entities/inscription";
import { AppError } from "../error";
import { INewInscription, IInscription } from "../interfaces/inscriptions.interfaces";

class InscriptionService {

    static textRepository = AppDataSource.getRepository(TextVip)

    static async create(data: INewInscription): Promise<IInscription> {
        const alreadySended = await this.textRepository.findOne({
            where: {
                contato: data.contato
            }
        })

        if (alreadySended) {
            throw new AppError("Sua solicitação ja foi enviada, aguarde a aprovacao!  Devido à alta procura, o prazo de análise é de 10 dias úteis. Entraremos em contato para o cadastro quando seu perfil for selecionado!")
        }

        data.nome.toLowerCase()

        const newInscription = this.textRepository.save(data)
        return newInscription

    }

    static async getAll(): Promise<IInscription[]> {
        return await this.textRepository.find()
    }

    static async delete(id: string): Promise<void> {
        const inscription = await this.textRepository.findOne({
            where: { id: id }
        })

        if (!inscription) {
            throw new AppError("inscription not found", 404)
        }

        await this.textRepository.delete(inscription)
        return
    }
}

export default InscriptionService
