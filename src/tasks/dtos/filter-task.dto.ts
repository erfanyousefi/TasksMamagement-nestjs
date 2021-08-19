import { IsEnum, IsOptional, IsString } from "class-validator";
import { Task_Status } from "../task.model";

export class FilterTaskDTO {
    @IsOptional()
    @IsEnum(Task_Status)
    status?: Task_Status;
    @IsOptional()
    @IsString()
    search?: string;
}