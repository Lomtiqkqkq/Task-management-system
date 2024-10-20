import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from '../../tasks/entity/task.entity';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop({ required: true, unique: true })
  teamName: string;
  @Prop({ default: null })
  membersId: string[];
}
export const TeamSchema = SchemaFactory.createForClass(Team);
