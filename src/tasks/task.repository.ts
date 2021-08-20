import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dtos/create-task.dto";
import { FilterTaskDTO } from "./dtos/filter-task.dto";
import { Task_Status } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDto;
        let task = this.create({
            title, description, status: Task_Status.OPEN
        })
        await this.save(task)
        return task
    }
    async getAllTask(filterDto: FilterTaskDTO): Promise<Task[]> {
        let query = this.createQueryBuilder('task');
        let {status, search} = filterDto;
        if(status){
            query.andWhere('task.status = :status', {status})
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search : `%${search}%`})
        }
        let tasks = await query.getMany()
        return tasks
    }
}