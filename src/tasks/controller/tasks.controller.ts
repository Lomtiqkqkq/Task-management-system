import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../dto/create.task.dto';
import { UpdateTaskDto } from '../dto/update.task.dto';
import { Task } from '../entity/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TasksService) {}
  @Post('/create')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }
  @Patch('/assign/:id')
  assignTask(
    @Param('id') id: string,
    @Body() userId?: string,
    @Body() teamId?: string,
  ) {
    return this.taskService.assignTask(id, teamId['teamId'], userId['userId']);
  }
  @Patch('/remove/:id')
  removeTaskExec(@Param('id') id: string) {
    return this.taskService.removeTaskFromExec(id);
  }
  @Patch('/update/:id')
  patchTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.patchTask(updateTaskDto, id);
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
}
