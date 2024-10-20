import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Team } from '../../Teams/entity/team.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ default: null })
  team: Team | null;
  @Prop({ default: 'user', enum: ['admin', 'user'] })
  role: 'admin' | 'user';
}
export const UserSchema = SchemaFactory.createForClass(User);
