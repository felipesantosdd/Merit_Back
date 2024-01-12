import "reflect-metadata"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Message } from "./message.Entity"

@Entity()
export class TextVip {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar" })
    nome: string

    @Column({ type: "int", nullable: true })
    horas: number

    @Column({ type: "varchar" })
    celular: string

    @Column({ type: "varchar" })
    contato: string
}

export default TextVip
