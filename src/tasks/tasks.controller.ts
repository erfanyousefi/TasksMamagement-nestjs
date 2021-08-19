import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { FilterTaskDTO } from './dtos/filter-task.dto';
import { Task, Task_Status } from './task.model';
import { TaskService } from './tasks.service';
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    public getTasks(@Query() filterTaskDto: FilterTaskDTO) {
        if (Object.keys(filterTaskDto).length) {
            return this.taskService.findTaskWithFilter(filterTaskDto)
        }else{
            return this.taskService.getAllTasks();
        }
    }
    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDTO): Task {
        const task = this.taskService.createTask(createTaskDto)
        return task
    }

    @Get('/:id')
    public findTaskById(@Param('id') id: string): Task {
        return this.taskService.findTaskById(id)
    }

    @Delete('/:id')
    public deleteTaskById(@Param('id') id: string): string {
        return this.taskService.deleteTaskById(id)
    }

    @Patch("/:id/status")
    public updateTsakStatus(@Param('id') id: string, @Body('status') status: Task_Status): Task {
        return this.taskService.updateTaskStatus(id, status)
    }
}