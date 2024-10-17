import { Controller } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TasksService) {}
}
