import { Module } from '@nestjs/common';
import { CategoryModule } from './categories/category.module';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [TaskModule, CategoryModule],
})
export class AppModule { }
