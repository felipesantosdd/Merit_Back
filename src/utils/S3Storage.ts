import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import mime from "mime";
import fs from "fs/promises";
import { Readable } from 'stream';
import "dotenv/config";
import { AppError } from "../error";


class S3Storage {
    private client: S3Client;

    constructor() {
        this.client = new S3Client({
            region: 'us-east-2',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    async saveFile(fileName: string): Promise<void> {
        const originalPath = path.resolve(`dist/tmp/${fileName}`);
        // const originalPath = path.resolve(`src/tmp/${fileName}`);

        try {
            const contentType = mime.getType(originalPath);

            if (!contentType) {
                throw new AppError('Tipo de conteúdo não encontrado para o arquivo', 404);
            }

            const fileContent = await fs.readFile(originalPath);

            await this.client.send(new PutObjectCommand({
                Bucket: 'dianealmeida-modelos',
                Key: fileName,
                Body: fileContent,
                ContentType: contentType,
                ACL: 'public-read',
            }));

            await fs.unlink(originalPath);
        } catch (error) {
            // Handle AWS SDK errors or rethrow the original error
            console.error("Error saving file to S3:", error);
            throw new AppError('Erro ao salvar o arquivo no S3', 500);
        }
    }

    async getFile(fileName: string): Promise<Buffer> {
        try {
            const response = await this.client.send(new GetObjectCommand({
                Bucket: 'dianealmeida-modelos',
                Key: fileName,
            }));

            if (response.Body instanceof Readable) {
                // Stream the content and convert it to a buffer
                const chunks: Uint8Array[] = [];
                for await (const chunk of response.Body) {
                    chunks.push(chunk);
                }
                return Buffer.concat(chunks);
            } else {
                throw new AppError('Arquivo não encontrado no S3', 404);
            }
        } catch (error) {
            // Handle AWS SDK errors or rethrow the original error
            console.error("Error getting file from S3:", error);
            throw new AppError('Erro ao obter o arquivo do S3', 500);
        }
    }
}

export default S3Storage;
