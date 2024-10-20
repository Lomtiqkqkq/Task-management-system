import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TasksService } from '../tasks/service/tasks.service';

@WebSocketGateway()
export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly taskService: TasksService) {}

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }
  notifyStatusChange(taskId: string, newStatus: string) {
    this.server.emit('statusChange', { taskId, newStatus });
  }
}
