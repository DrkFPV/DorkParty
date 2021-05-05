import { HttpService, Inject, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { ConfigService } from "@nestjs/config";
import { YoutubeSongDto } from "./dto/youtube-song.dto";
import { AddSongDto } from "./dto/add-song.dto";
import { RemoveSongDto as RemoveSongDto } from "./dto/remove-song.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {  PlaylistDocument } from "src/playlists/schemas/playlist.schema";
import { REQUEST } from "@nestjs/core";
import { IUserAuthRequest } from "src/auth/interfaces/userAuthRequest.interface";

@Injectable()
export class SongsService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
        @InjectModel('Playlist') private readonly playlistModel: Model<PlaylistDocument>, 
        @Inject(REQUEST) private readonly request: IUserAuthRequest) {
        }

    searchYoutube(query:string): Promise<AxiosResponse<YoutubeSongDto[]>> {
        const yt_key = this.configService.get('YOUTUBE_KEY');
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${yt_key}`
        return this.httpService.get(url).toPromise();         
    }
    
    async addSong(addSongDto:AddSongDto): Promise<PlaylistDocument | undefined> {
        const {playlistId , ...song} = addSongDto
        const playlist = await this.playlistModel.findOneAndUpdate(
            { _id:addSongDto.playlistId, userId: this.request.user.userId },
            { $addToSet: { 'songs': song }},
            { upsert: true, new : true, useFindAndModify:true }
        );
        return playlist
    }

    async removeSong(removeSongDto:RemoveSongDto): Promise<PlaylistDocument | undefined>{
        var playlist = await this.playlistModel.findOneAndUpdate(
            { _id:removeSongDto.playlistId, userId: this.request.user.userId },
            { $pull: {'songs': { songId: removeSongDto.songId }}},
            { useFindAndModify:true, new: true }
        );
        return playlist;
    }
}

