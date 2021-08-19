import { Task_Status } from "../task.model";

export class FilterTaskDTO {
    status?: Task_Status;
    search?: string;
}