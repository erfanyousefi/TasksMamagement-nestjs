import { Injectable, NotFoundException } from '@nestjs/common';
import { Task_Status } from './task-status.enum';
import { v4 as uuid } from "uuid"
import { CreateTaskDTO } from './dtos/create-task.dto';
import { FilterTaskDTO } from './dtos/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository
    ) { }

    public async getAllTasks(filterDto : FilterTaskDTO): Promise<Task[]> {
        const tasks = await this.taskRepository.getAllTask(filterDto);
        return tasks;
    }
    public async findTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) throw new NotFoundException("Not Found Task with id : " + id);
        return found
    }
    public async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    public async deleteTaskById(id: string): Promise<Task> {
        const found = await this.findTaskById(id);
        await this.taskRepository.delete({ id: found.id });
        return found
    }
    public async updateTaskStatus(id, status : Task_Status) {
        const task = await this.findTaskById(id);
        task.status = status
        await this.taskRepository.save(task)
        return task
    }
    // public findTaskWithFilter(filterTaskDto: FilterTaskDTO): Task[] {
    //     const { status, search } = filterTaskDto;
    //     //create tempreator array for hold my tasks
    //     let tasks = this.getAllTasks();
    //     //do some things if exist status
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }
    //     //do some things if exist search
    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             (task.title.includes(search) || task.description.includes(search))
    //         )
    //     }
    //     //return task result
    //     return tasks
    // }
}