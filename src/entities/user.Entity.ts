import "reflect-metadata"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Message } from "./message.Entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar" })
    nome: string

    @Column({ type: "varchar", nullable: true })
    sobrenome: string

    @Column({ type: "varchar" })
    email: string

    @Column({ type: "varchar" })
    password: string

    @Column({ type: "float", default: 0 })
    ranking: number

    @Column({ type: "varchar", default: undefined, nullable: true })
    app_id: string

    @Column({ type: "varchar", default: undefined, nullable: true })
    app_name: string

    @Column({ type: "varchar", nullable: true })
    recruiter: User

    @Column({ type: "date", nullable: true })
    age: Date

    @Column({ type: "boolean", default: false })
    active: boolean

    @Column({ type: "boolean", default: false })
    approved: boolean

    @Column({ type: "varchar", default: "https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg" })
    avatar: string

    @Column({ type: "varchar", nullable: true })
    document_front: string

    @Column({ type: "varchar", nullable: true })
    document_back: string

    @Column({ type: "varchar", nullable: true })
    hani_print: string

    @Column({ type: "float", default: 0 })
    balance: number

    @Column({ type: "boolean", default: false })
    isAdmin: boolean

    @Column({ type: "boolean", default: false })
    app_vip: boolean

    @OneToMany(() => Message, (message) => message.sender)
    sended: Message[]

    @OneToMany(() => Message, (message) => message.recipient)
    received: Message[]


}

export default User
