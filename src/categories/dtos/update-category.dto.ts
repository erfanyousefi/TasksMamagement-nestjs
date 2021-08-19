import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDTO {
    @IsNotEmpty()
    @IsString()
    title: string
}