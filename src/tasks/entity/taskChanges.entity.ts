import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Task } from './task.entity';

@Schema()
export class TaskChanges {
  @Prop()
  taskId: string;
  @Prop()
  changes: string;
  @Prop()
  updatedAt: Date;
  @Prop()
  updatedBy: string;
}
export const TaskChangesSchema = SchemaFactory.createForClass(TaskChanges);
