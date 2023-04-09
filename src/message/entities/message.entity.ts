import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  message: string;

  @Prop({ type: [String], required: true })
  users: string[];

  @Prop({ required: true })
  receiver: string;

  @Prop({ required: true })
  sender: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
