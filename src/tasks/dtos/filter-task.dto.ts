import { IsEnum, IsOptional, IsString } from "class-validator";
import { Task_Status } from "../task-status.enum";

export class FilterTaskDTO {
    @IsEnum(Task_Status)
    @IsOptional()
    status?: Task_Status;
    @IsOptional()
    @IsString()
    search?: string;
}