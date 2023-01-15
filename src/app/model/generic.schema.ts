import { Prop } from '@nestjs/mongoose';
export class GenericSchema {
  @Prop({ auto: true, required: true })
  _id: string;
}
