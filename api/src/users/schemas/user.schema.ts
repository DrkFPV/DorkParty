import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export type UserDocument = IUser & Document

@Schema()
export class User {
  @Prop({unique:true})
  username: string;

  @Prop()
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

//export const UserSchema = new mongoose.Schema({
//  name: { type: String, required: true },
//  email:{ type: String, required: true },
//  salt: { type: String, required: true },
//  hash: { type: String, required: true },
//}, {timestamps:true})