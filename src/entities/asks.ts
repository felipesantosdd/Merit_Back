import "reflect-metadata"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Message } from "./message.Entity"

@Entity()
export class Ask {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar" })
    title: string

    @Column({ type: "varchar", nullable: true })
    response: string

}

export default Ask
