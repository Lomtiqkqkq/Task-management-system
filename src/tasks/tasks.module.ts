import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TaskController } from './controller/tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entity/task.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CheckOverdueTask } from './events/listeners/check.overdue.task';
import { TaskHistoryService } from './service/task.history.service';
import { TaskChanges, TaskChangesSchema } from './entity/taskChanges.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([
      { name: TaskChanges.name, schema: TaskChangesSchema },
    ]),
    EventEmitterModule.forRoot(),
  ],
  providers: [TasksService, CheckOverdueTask, TaskHistoryService],
  controllers: [TaskController],
})
export class TasksModule {}
