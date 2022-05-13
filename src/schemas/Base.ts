import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type BaseDocument = Base & Document;

@Schema()
export class Base {
  @Prop({
    default: Date.now,
    type: 'Number',
  })
  createdAt: Date;

  @Prop({
    default: Date.now,
    type: 'Number',
  })
  updatedAt: Date;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
