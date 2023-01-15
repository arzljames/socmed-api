import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { GenericSchema } from '../generic.schema';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User implements GenericSchema {
  _id: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: Date, default: () => Date.now() })
  created_at: Date;

  @Prop({ type: Date, default: () => Date.now() })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
