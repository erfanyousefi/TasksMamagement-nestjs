import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: true })
    name: string
    @Column({ nullable: false })
    password: string;
    @Column({ nullable: false, unique : true })
    email: string
}