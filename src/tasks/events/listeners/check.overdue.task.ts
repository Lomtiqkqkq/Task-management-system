import { Injectable } from '@nestjs/common';

import { TasksService } from '../../service/tasks.service';

@Injectable()
export class CheckOverdueTask {
  constructor(private readonly taskService: TasksService) {}

  checkOverdueTask() {
    setInterval(
      () => {
        this.taskService.eventOverdueTask();
      },
      1000 * 60 * 60 * 24,
    );
  }
}
