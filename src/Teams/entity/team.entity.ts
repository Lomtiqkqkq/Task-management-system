import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from '../../tasks/entity/task.entity';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop()
  teamName: string;
  @Prop()
  members: number[];
  @Prop()
  tasks: Task[];
}
export const TeamSchema = SchemaFactory.createForClass(Team);
