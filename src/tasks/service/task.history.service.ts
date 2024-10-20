import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskChanges } from '../entity/taskChanges.entity';

@Injectable()
export class TaskHistoryService {
  constructor(
    @InjectModel('TaskChanges')
    private readonly taskHistoryModel: Model<TaskChanges>,
  ) {}

  async addHistoryEntry(
    taskId: string,
    changes: string,
    updatedBy: string,
  ): Promise<TaskChanges> {
    const historyEntry = new this.taskHistoryModel({
      taskId,
      changes,
      updatedBy,
    });
    await historyEntry.save();
    return historyEntry;
  }
  async getHistory(taskId: string): Promise<TaskChanges[]> {
    return await this.taskHistoryModel.find({ taskId }).exec();
  }
}
