import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../dto/create.task.dto';
import { UpdateTaskDto } from '../dto/update.task.dto';
import { eStatus, Task } from '../entity/task.entity';
import { RolesMiddleware } from '../../middleware/roles.middleware';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TasksService) {}
  @UseGuards(RolesMiddleware)
  @Post('/create')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }
  @UseGuards(RolesMiddleware)
  @Patch('/assign/:id')
  assignTask(
    @Param('id') id: string,
    @Body() userId?: string,
    @Body() teamId?: string,
  ) {
    return this.taskService.assignTask(id, teamId['teamId'], userId['userId']);
  }
  @UseGuards(RolesMiddleware)
  @Patch('/remove/:id')
  removeTaskExec(@Param('id') id: string) {
    return this.taskService.removeTaskFromExec(id);
  }
  @Patch('/update/:id')
  patchTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.patchTask(
      updateTaskDto,
      id,
      updateTaskDto.updatedBy,
    );
  }
  @Get('/findQuery')
  findQuery(
    @Query('status') status?: string,
    @Query('dueDate') dueDate?: string,
    @Query('executorId') executorId?: string,
  ): Promise<Task[]> {
    const dueDateParsed = dueDate ? new Date(dueDate) : undefined;
    return this.taskService.filteredTasks(status, dueDateParsed, executorId);
  }
  @Post('/delete/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
  @Patch('status/:id')
  async updateTaskStatus(
    @Param('id') taskId: string,
    @Body('status') status: eStatus,
  ) {
    return await this.taskService.updatedTaskStatus(taskId, status);
  }
  @Get('getMyTask/:id')
  getUserTask(@Param('id') userId: string) {
    return this.taskService.getUserTask(userId);
  }
}
