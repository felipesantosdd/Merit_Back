import "reflect-metadata"
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Message } from "./message.Entity"
import { Exclude } from 'class-transformer';

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

    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
    createdAt: Date;

    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
    updatedAt: Date;

    @Column({ type: 'boolean', default: false })
    paymentRequested: boolean;

    @Column({ type: "boolean", default: false })
    is_recruiter: boolean

    @ManyToOne(() => User, user => user.recruits)
    manager: User;

    @OneToMany(() => User, user => user.manager, { nullable: true })
    @Exclude()
    recruits: User[];

    @Column({ type: "date", nullable: true })
    age: Date

    @Column({ type: "boolean", default: false })
    active: boolean

    @Column({ type: "boolean", default: false })
    approved: boolean

    @Column({ type: "varchar", default: "https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg" })
    avatar: string

    @Column({ type: "varchar", default: 'https://queropack.com/assets/img/img-doc-front.jpg' })
    document_front: string

    @Column({ type: "varchar", default: 'https://queropack.com/assets/img/img-doc-back.jpg' })
    document_back: string

    @Column({ type: "varchar", default: 'https://queropack.com/assets/img/img-selfie.jpg' })
    selfie: string

    @Column({ type: "varchar", nullable: true })
    hani_print: string

    @Column({ type: "int", default: 0 })
    balance: number

    @Column({ type: "varchar", nullable: true })
    pix_key: string

    @Column({ type: "varchar", nullable: true })
    pix_name: string

    @Column({ type: "varchar", nullable: true })
    pix_type: string

    @Column({ type: "boolean", default: false })
    isAdmin: boolean

    @Column({ type: "boolean", default: false })
    stand_by: boolean

    @Column({ type: "boolean", default: false })
    app_vip: boolean

    @OneToMany(() => Message, (message) => message.sender)
    sended: Message[]

    @OneToMany(() => Message, (message) => message.recipient)
    received: Message[]


}

export default User
