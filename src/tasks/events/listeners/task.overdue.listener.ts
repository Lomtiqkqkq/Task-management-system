import { Injectable } from '@nestjs/common';
import { TaskOverdueEvents } from '../task.overdue.event';

@Injectable()
export class EventsHandler {
  handle(event: TaskOverdueEvents) {
    console.log(`task ${event.taskId} overdue by ${event.userId}`);
  }
}
