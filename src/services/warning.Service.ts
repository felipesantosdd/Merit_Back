import { AppDataSource } from "../data-source";
import Warnings from "../entities/warnings.Entity";
import { AppError } from "../error";
import { IAsk, INewAsk } from "../interfaces/asks.Interfaces";
import { INewWarning, IWarning } from "../interfaces/warnings.Interfaces";
import S3Storage from "../utils/S3Storage";

class WarningsService {

    static warningsRepository = AppDataSource.getRepository(Warnings)

    static async create(req: any): Promise<IWarning> {

        const data: INewWarning = req.body

        const alreadySended = await this.warningsRepository.findOne({
            where: {
                title: data.title
            }
        })

        if (alreadySended) {
            throw new AppError("Ja existe uma aviso com esse titulo...")
        }

        if (req.file) {

            const s3Storage = new S3Storage()

            await s3Storage.saveFile(req.file.filename)

            data.image = `https://dianealmeida-modelos.s3.us-east-2.amazonaws.com/${req.file?.filename}`

            await this.warningsRepository.save(data)
        }

        data.title.toLowerCase()

        const newWarning = this.warningsRepository.save(data)
        return newWarning

    }

    static async getAll(query: any): Promise<{ Warnings: IWarning[], totalPages: number, currentPage: number, nextPage: number | null, prevPage: number | null }> {
        const page: number = Number(query.page) || 1;
        const itemsPerPage: number = 10;

        const totalWarnings = await this.warningsRepository.count();

        if (totalWarnings === 0) {
            return {
                Warnings: [],
                totalPages: 0,
                currentPage: page,
                nextPage: null,
                prevPage: null
            };
        }

        const totalPages = Math.ceil(totalWarnings / itemsPerPage);



        if (page < 1 || page > totalPages) {
            throw new Error('Página inválida');
        }

        const Warnings = await this.warningsRepository.find({
            take: itemsPerPage,
            skip: itemsPerPage * (page - 1),
            order: {
                createdAt: 'DESC'
            }
        });

        return {
            Warnings: Warnings,
            totalPages: totalPages,
            currentPage: page,
            nextPage: page === totalPages ? null : page + 1,
            prevPage: page === 1 ? null : page - 1
        };
    }

    static async delete(id: string): Promise<void> {
        const warning = await this.warningsRepository.findOne({
            where: { id: id }
        })

        if (!warning) {
            throw new AppError("warning not found", 404)
        }

        await this.warningsRepository.delete({ id: warning.id })
        return
    }
}

export default WarningsService
