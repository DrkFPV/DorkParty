import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type RoomDocument = Room & Document

@Schema()
export class Room {
  @Prop({required:true})
  adminId: string;

  @Prop({required:true})
  adminName: string;

  @Prop({required:true})
  modIds: [{userId:string, userName:string;}]

  @Prop({required:true})
  roomName: string;

  @Prop({required:true, default:false})
  isPrivate: Boolean;

  @Prop({select: false})
  hash: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room)
RoomSchema.index({adminId:1,roomName:1}, {unique:true})