import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Profile, ProfileSchema } from './profile.schema';


@Schema() // Habilita timestamps (createdAt, updatedAt)
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: ProfileSchema, required: true })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);

