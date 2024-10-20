import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  header: string;
  @Prop()
  description: string;
  @Prop({ default: 'waiting' })
  status: eStatus;
  @Prop()
  due_date: Date;
  @Prop({ default: false })
  overdue: boolean;
  @Prop({ allowNull: true, default: null })
  executorId: string;
}
export enum eStatus {
  waiting = 'waiting',
  executing = 'executing',
  error = 'error',
  completed = 'completed',
}
export const TaskSchema = SchemaFactory.createForClass(Task);
