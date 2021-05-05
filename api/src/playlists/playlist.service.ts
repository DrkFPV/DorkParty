import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlayListDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { Playlist, PlaylistDocument } from "./schemas/playlist.schema";
import { IUserAuthRequest } from "src/auth/interfaces/userAuthRequest.interface";

@Injectable({ scope: Scope.REQUEST })
export class PlaylistService{
    constructor(
        @InjectModel('Playlist') private readonly playlistModel: Model<PlaylistDocument>,
        @Inject(REQUEST) private readonly request: IUserAuthRequest){}

    async findAll(): Promise<Playlist[]> { 
        return await this.playlistModel.find({userId: this.request.user.userId});
    }

    async findOne(id:string): Promise<Playlist> { 
        return await this.playlistModel.findOne({_id: id, userId: this.request.user.userId});
    }
    
    async create(createPlayListDto:CreatePlayListDto): Promise<Playlist> {
        const newPlaylist = await this.playlistModel.create({name: createPlayListDto.name, userId: this.request.user.userId});
        return await newPlaylist.save();
    }

    async delete(id:string): Promise<Playlist> {        
        return await this.playlistModel.findByIdAndRemove({_id:id, userId: this.request.user.userId});
    }

    async update(updatePlaylistDto:UpdatePlaylistDto): Promise<Playlist> {        
        return await this.playlistModel.findOneAndUpdate({id:updatePlaylistDto.id, userId: this.request.user.userId},
            {name:updatePlaylistDto.name, userId: this.request.user.userId});
    }
}