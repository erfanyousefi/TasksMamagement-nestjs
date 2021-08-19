import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, Task_Status } from './task.model';
import { v4 as uuid } from "uuid"
import { CreateTaskDTO } from './dtos/create-task.dto';
import { FilterTaskDTO } from './dtos/filter-task.dto';
@Injectable()
export class TaskService {
    private tasks: Task[] = [];
    public getAllTasks(): Task[] {
        return this.tasks
    }
    public createTask(createTaskDto: CreateTaskDTO): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: Task_Status.OPEN
        }
        this.tasks.push(task)
        return task
    }
    public findTaskById(id): Task {
        const task = this.tasks.find(task => task.id === id)
        if (!task) {
            throw new NotFoundException(`was not exist task with id : ${id}`)
        }
        return task;
    }
    public deleteTaskById(id): Task {
        const found = this.findTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id)
        return found
    }
    public updateTaskStatus(id, status: Task_Status): Task {
        const found = this.findTaskById(id);
        this.tasks = this.tasks.map(task => {
            if (task.id === found.id) task.status = status
            return task
        })
        return found
    }
    public findTaskWithFilter(filterTaskDto: FilterTaskDTO): Task[] {
        const { status, search } = filterTaskDto;
        //create tempreator array for hold my tasks
        let tasks = this.getAllTasks();
        //do some things if exist status
        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }
        //do some things if exist search
        if (search) {
            tasks = tasks.filter(task =>
                (task.title.includes(search) || task.description.includes(search))
            )
        }
        //return task result
        return tasks
    }
}