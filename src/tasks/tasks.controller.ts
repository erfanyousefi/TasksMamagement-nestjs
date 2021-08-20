import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { FilterTaskDTO } from './dtos/filter-task.dto';
import { UpdateTaskStatusDTO } from './dtos/updateTaskStatus.dto';
import { Task_Status } from './task-status.enum';
import { Task } from './task.entity';
import { TaskService } from './tasks.service';
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    @Get()
    public getAllTask(@Query() filterDto: FilterTaskDTO): Promise<Task[]> {
        return this.taskService.getAllTasks(filterDto)
    }
    @Get(':id')
    public findTaskById(@Param("id") id: string): Promise<Task> {
        return this.taskService.findTaskById(id);
    }
    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }
    @Delete(":id")
    public deleteTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.deleteTaskById(id)
    }
    @Patch(':id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDTO): Promise<Task> {
        let { status } = updateTaskStatusDto
        return this.taskService.updateTaskStatus(id, status)
    }
    // @Get()
    // public getTasks(@Query() filterTaskDto: FilterTaskDTO) {
    //     if (Object.keys(filterTaskDto).length) {
    //         return this.taskService.findTaskWithFilter(filterTaskDto)
    //     } else {
    //         return this.taskService.getAllTasks();
    //     }
    // }
}