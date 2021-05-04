import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { Song } from '../../songs/interfaces/song.interface'

export type PlaylistDocument = Playlist & Document

@Schema()
export class Playlist {
  @Prop({type: Types.ObjectId, ref:  "User", required: true})
  userId: string;

  @Prop({required: true})
  name: string;

  @Prop()
  songs: [{
    songId:string;
    url:string;
    type?:string;
    thumbnail?:string;
  }]
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
PlaylistSchema.index({userId:1,name:1}, {unique:true})

