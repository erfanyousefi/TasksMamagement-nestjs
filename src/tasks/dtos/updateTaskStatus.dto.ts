import { IsEnum } from "class-validator";
import { Task_Status } from "../task.model";

export class UpdateTaskStatusDTO {
    @IsEnum(Task_Status, {message : "Invalid Status value"})
    status: Task_Status
}