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

    static async getAll(query: any): Promise<{ inscriptions: IInscription[], totalPages: number, currentPage: number, nextPage: number | null, prevPage: number | null }> {
        const page: number = Number(query.page) || 1
        const itemsPerPage: number = 5;

        const totalInscriptions = await this.textRepository.count();

        const totalPages = Math.ceil(totalInscriptions / itemsPerPage);

        if (page < 1 || page > totalInscriptions) {
            throw new Error('Página inválida');
        }

        const inscriptions = await this.textRepository.find({
            take: itemsPerPage,
            skip: itemsPerPage * (page - 1),
            order: {
                createdAt: "DESC"
            }
        })

        return {
            inscriptions: inscriptions,
            totalPages: totalPages,
            currentPage: page,
            nextPage: page === totalPages ? null : page + 1,
            prevPage: page === 1 ? null : page - 1
        };
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
