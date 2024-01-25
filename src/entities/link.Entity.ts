import "reflect-metadata"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Message } from "./message.Entity"

@Entity()
export class Link {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar" })
    link: string
}

export default Link
