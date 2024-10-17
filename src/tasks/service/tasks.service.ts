import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../entity/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getOneTask(): Promise<Task> {
    const task = await this.taskModel.findOne({ where: { status: 1 } });
    console.log(task);
    return task;
  }
}
