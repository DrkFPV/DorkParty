import { Song } from "src/songs/interfaces/song.interface";
import { Document } from 'mongoose'


export interface IPlaylist extends Document{
    name: string;
    description?: string;
    songs:Song[];
}
