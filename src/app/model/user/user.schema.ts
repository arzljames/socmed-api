import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MoongoseSchema } from 'mongoose';
import { GenericSchema } from '../generic.schema';
import { Profile } from '../profile/profile.schema';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User implements GenericSchema {
  _id: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  is_verified: boolean;

  @Prop({ default: true })
  is_new_user: boolean;

  @Prop({ default: 'Offline' })
  status: string;

  @Prop({ type: MoongoseSchema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop({ type: Date, default: () => Date.now() })
  created_at: Date;

  @Prop({ type: Date, default: () => Date.now() })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
