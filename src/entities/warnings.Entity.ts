import "reflect-metadata"
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"

@Entity()
export class Warnings {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 600, nullable: false })
    title: string

    @Column({ type: "text", nullable: false })
    text: string

    @Column({ type: "varchar", length: 600, nullable: false })
    app_name: string

    @Column({ type: "text", nullable: true })
    image: string

    @CreateDateColumn()
    createdAt: Date

}

export default Warnings
