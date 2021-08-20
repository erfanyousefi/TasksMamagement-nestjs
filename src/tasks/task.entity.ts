import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Task_Status } from "./task-status.enum";

@Entity({ name: 'task' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: Task_Status;
}