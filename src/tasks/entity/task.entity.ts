import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/entity/user.entity';
import { Team } from '../../users/entity/team.entity';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  header: string;
  @Prop()
  description: string;
  @Prop()
  status: status;
  @Prop()
  due_date: Date;
  @Prop({ default: false })
  overdue: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userExecutor: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  teamExecutor: Team;
}
enum status {
  waiting = 'waiting',
  executing = 'executing',
  error = 'error',
  completed = 'completed',
}
export const TaskSchema = SchemaFactory.createForClass(Task);
