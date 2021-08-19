import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDTO {
    @IsNotEmpty()
    @IsString()
    title: string
}