import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.entity';
import * as mongoose from 'mongoose';
import { Task } from '../../tasks/entity/task.entity';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop()
  teamName: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  members: User[];
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Task', default: null })
  tasks: Task[];
}
