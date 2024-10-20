import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { eStatus, Task } from '../entity/task.entity';
import { CreateTaskDto } from '../dto/create.task.dto';
import { ServiceError } from '../../exceptions/service.error';
import { UpdateTaskDto } from '../dto/update.task.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskOverdueEvents } from '../events/task.overdue.event';
import { TaskHistoryService } from './task.history.service';
import { TaskGateway } from '../../websocket/task.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly _taskRepository: Model<Task>,
    private readonly eventEmitter: EventEmitter2,
    private readonly taskHistoryService: TaskHistoryService,
    private readonly taskGateway: TaskGateway,
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
  async patchTask(
    updateTaskDto: UpdateTaskDto,
    id: string,
    updatedBy: string,
  ): Promise<object> {
    const task = await this._taskRepository.findById(id);
    if (!task) {
      throw new ServiceError('Task not found');
    }
    const changes = JSON.stringify({ ...task.toObject(), ...updateTaskDto });
    Object.assign(task, UpdateTaskDto);
    await task.save();
    await this.taskHistoryService.addHistoryEntry(id, changes, updatedBy);
    return task;
  }
  async deleteTask(id: string) {
    const task = await this._taskRepository.findByIdAndDelete(id);
    return { message: 'task deleted successfully', task: task };
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
  async eventOverdueTask() {
    const nowTime = new Date();
    const overdueTasks = await this._taskRepository
      .find({
        dueDate: { $lt: nowTime },
      })
      .exec();
    overdueTasks.map((task) => {
      task.overdue = true;
    });

    for (const task of overdueTasks) {
      this.eventEmitter.emit(
        'task.overdue',
        new TaskOverdueEvents(task.id, task.executorId),
      );
    }
  }
  async updatedTaskStatus(taskId: string, status: eStatus): Promise<object> {
    const updatedTask = await this._taskRepository.findByIdAndUpdate(
      taskId,
      { status: status },
      { new: true },
    );
    if (updatedTask) {
      this.taskGateway.notifyStatusChange(taskId, status);
      return updatedTask;
    }
  }
  async getUserTask(userId: string): Promise<object[]> {
    return await this._taskRepository.find({ userId: userId }).exec();
  }
}
