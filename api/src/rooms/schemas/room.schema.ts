import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type RoomDocument = Room & Document

@Schema()
export class Room {
  @Prop({unique:true})
  adminId: string;

  @Prop()
  modIds: [{userId:string, userName:string;}]

  @Prop()
  roomName: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);