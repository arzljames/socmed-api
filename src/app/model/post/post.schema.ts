import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MoongoseSchema } from 'mongoose';
import { GenericSchema } from '../generic.schema';
import { User } from '../user/user.schema';

export type PostDocument = Post & Document;

export class Reactions {
  @Prop({ type: MoongoseSchema.Types.ObjectId, ref: 'User' })
  reactor: User;

  @Prop()
  reaction: number;
}

@Schema({
  versionKey: false,
  collection: 'posts',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Post implements GenericSchema {
  _id: string;

  @Prop({ type: MoongoseSchema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  message: string;

  @Prop()
  reactions: Reactions[];

  @Prop({ type: Date, default: () => Date.now() })
  created_at: Date;

  @Prop({ type: Date, default: () => Date.now() })
  updated_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
