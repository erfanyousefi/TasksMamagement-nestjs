import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [TaskModule],
})
export class AppModule { }
