import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop()
  id: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);