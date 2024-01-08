import "reflect-metadata"
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
import User from "./user.Entity"

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 600, nullable: true })
    text: string

    @Column({ type: "text", nullable: true })
    subject: string

    @ManyToOne(() => User, (user) => user.sended, { onDelete: "CASCADE" })
    sender: User

    @ManyToOne(() => User, (user) => user.received, { onDelete: "CASCADE" })
    recipient: User

    @Column({ type: "boolean", default: false })
    isRead: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}

export default Message
