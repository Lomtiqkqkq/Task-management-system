import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TaskController } from './controller/tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entity/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TasksService],
  controllers: [TaskController],
})
export class TasksModule {}
