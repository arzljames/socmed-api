import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenericSchema } from '../generic.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class ProfilePhoto {
  @Prop({
    default: '',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  })
  path: string;

  @Prop()
  filename: string;
}

@Schema()
export class CoverPhoto {
  @Prop({
    default: '',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  })
  path: string;

  @Prop()
  filename: string;
}

@Schema({
  versionKey: false,
  collection: 'profiles',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Profile implements GenericSchema {
  _id: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ required: false, default: '' })
  middle_name: string;

  @Prop()
  initials: string;

  @Prop()
  profile_color: string;

  @Prop(
    raw({
      path: { type: String },
      filename: { type: String },
    }),
  )
  profile_photo: ProfilePhoto;

  @Prop(
    raw({
      path: { type: String },
      filename: { type: String },
    }),
  )
  cover_photo: CoverPhoto;

  @Prop()
  contact_number: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
