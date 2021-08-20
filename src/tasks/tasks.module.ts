import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskRepository } from "./task.repository";
import { TaskController } from "./tasks.controller";
import { TaskService } from "./tasks.service";

@Module({
    imports: [TypeOrmModule.forFeature([TaskRepository])],
    controllers: [TaskController],
    providers: [TaskService]
})

export class TaskModule { }