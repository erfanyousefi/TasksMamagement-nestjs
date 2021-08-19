import { Category } from "./category.model";
import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { v4 as uuid } from "uuid"
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateCategoryDTO } from "./dtos/update-category.dto";

@Injectable()
export class CategoryService {
    private categories: Category[] = []
    public getAllCategoryies(): Category[] {
        return this.categories;
    }
    public createCategory(createCategoryDto: CreateCategoryDTO): Category {
        const { title } = createCategoryDto;
        const category = {
            id: uuid(),
            title
        }
        this.categories.push(category)
        return category;
    }
    public findCategoryById(id): Category {
        const found = this.categories.find(category => category.id === id);
        if (!found) throw new NotFoundException()
        return found
    }
    public deleteCategoryById(id: string): Category {
        const found = this.findCategoryById(id);
        this.categories = this.categories.filter(category => category.id !== found.id);
        return found
    }
    public updateCategoryTitle(id, updateCategoryDto: UpdateCategoryDTO): Category {
        const found = this.findCategoryById(id)
        const { title } = updateCategoryDto;
        this.categories = this.categories.map(category => {
            if (category.id === found.id) {
                category.title = title
            }
            return category
        })
        return this.findCategoryById(id)
    }

}