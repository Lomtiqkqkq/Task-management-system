import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Team } from '../../Teams/entity/team.entity';
import { Task } from '../../tasks/entity/task.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ default: 'none', type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  team: Team | null;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null })
  tasks: Task[];
}
export const UserSchema = SchemaFactory.createForClass(User);
