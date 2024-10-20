import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { eStatus, Task } from '../entity/task.entity';
import { CreateTaskDto } from '../dto/create.task.dto';
import { ServiceError } from '../../exceptions/service.error';
import { UpdateTaskDto } from '../dto/update.task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly _taskRepository: Model<Task>,
  ) {}
  async createTask(createTaskDTO: CreateTaskDto) {
    const task = await this._taskRepository.create(createTaskDTO);
    await task.save();
    if (createTaskDTO.executorId) {
      task.status = eStatus.executing;
      //TODO add validation userID
      task.executorId = createTaskDTO.executorId;
      return task;
    }
    return task;
  }
  async assignTask(taskId: string, userId?: string, teamId?: string) {
    const task = await this._taskRepository.findById(taskId).exec();
    if (!task) {
      throw new ServiceError('Task not found');
    }
    if (userId || teamId) {
      task.status = eStatus.executing;
      task.executorId = userId || teamId;
      await task.save();
      return { message: 'task successfully assigned', task: task };
    }
    throw new ServiceError('please correct User or Team ');
  }
  async removeTaskFromExec(taskId: string): Promise<object> {
    const task = await this._taskRepository.findById(taskId).exec();
    if (!task) {
      throw new ServiceError('Task not found');
    }
    if (task.executorId) {
      task.status = eStatus.waiting;
      task.executorId = null;
      return { message: 'task exec deleted successfully', task: task };
    }
    throw new ServiceError(
      'something went wrong, don`t found user or team executor',
    );
  }
  async patchTask(updateTaskDto: UpdateTaskDto, id: string): Promise<object> {
    const task = this._taskRepository
      .findByIdAndUpdate(id, updateTaskDto)
      .exec();
    return { message: 'task updated', task: task };
  }
  async filteredTasks(
    status?: string,
    dueDate?: Date,
    executorId?: string,
  ): Promise<Task[]> {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (dueDate) {
      filter.dueDate = { $lte: dueDate };
    }
    if (executorId) {
      filter.executorId = executorId;
    }
    if (executorId === null) {
      filter.executor = { $exists: false };
    }
    return this._taskRepository.find(filter).exec();
  }
}
