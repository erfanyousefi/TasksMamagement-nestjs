import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Category } from "./category.model";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { UpdateCategoryDTO } from "./dtos/update-category.dto";

@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    @Get()
    public getAllCategories() {
        return this.categoryService.getAllCategoryies();
    }
    @Get("/:id")
    public findCategoryById(@Param("id") id: string) {
        return this.categoryService.findCategoryById(id);
    }
    @Post()
    public createCategory(@Body() createCategoryDto: CreateCategoryDTO): Category {
        return this.categoryService.createCategory(createCategoryDto)
    }
    @Delete("/:id")
    public deleteCategoryById(@Param('id') id: string): Category {
        return this.categoryService.deleteCategoryById(id);
    }
    @Patch('/:id/title')
    public updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDTO): Category {
        return this.categoryService.updateCategoryTitle(id, updateCategoryDto);
    }

}