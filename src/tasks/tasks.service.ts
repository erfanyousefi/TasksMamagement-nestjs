import { Injectable } from '@nestjs/common';
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
        return this.tasks.find(task => task.id === id)
    }
    public deleteTaskById(id): string {
        this.tasks = [...this.tasks.filter(task => task.id !== id)]
        return "Deleting Task Done!"
    }
    public updateTaskStatus(id, status: Task_Status): Task {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) task.status = status
            return task
        })
        return this.findTaskById(id)
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