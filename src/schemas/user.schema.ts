import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Base } from './Base';

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type UserDocument = User & Document;

@Schema()
export class User extends Base {
  @Prop()
  name: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password?: string;

  @Prop({
    enum: [UserRoles.ADMIN, UserRoles.USER],
    default: UserRoles.USER,
  })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
