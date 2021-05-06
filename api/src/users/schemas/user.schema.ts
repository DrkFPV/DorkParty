import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export type UserDocument = IUser & Document

@Schema()
export class User {
  @Prop({unique:true})
  username: string;

  @Prop({select: false})
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);