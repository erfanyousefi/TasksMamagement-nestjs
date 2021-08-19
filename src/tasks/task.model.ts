
export interface Task{
    id : string,
    title : string,
    description : string,
    status : Task_Status
}

export enum Task_Status {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}