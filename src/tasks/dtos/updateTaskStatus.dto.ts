import { IsEnum } from "class-validator";
import { Task_Status } from "../task-status.enum";

export class UpdateTaskStatusDTO {
    @IsEnum(Task_Status, {message : "Invalid Status value"})
    status: Task_Status
}