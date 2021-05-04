import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlayListDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { Playlist, PlaylistDocument } from "./schemas/playlist.schema";

@Injectable()
export class PlaylistService{
    constructor(@InjectModel('Playlist') private readonly playlistModel: Model<PlaylistDocument>){}

    async findAll(userId:string): Promise<Playlist[]> { 
        return await this.playlistModel.find({userId:userId});
    }

    async findOne(id:string, userId:string): Promise<Playlist> { 
        return await this.playlistModel.findOne({_id: id, userId:userId});
    }
    
    async create(createPlayListDto:CreatePlayListDto, userId:string): Promise<Playlist> {
        const newPlaylist = await this.playlistModel.create({name: createPlayListDto.name, userId: userId});
        return await newPlaylist.save();
    }

    async delete(id:string, userId:string): Promise<Playlist> {        
        return await this.playlistModel.findByIdAndRemove({_id:id, userId:userId});
    }

    async update(updatePlaylistDto:UpdatePlaylistDto, userId:string): Promise<Playlist> {        
        return await this.playlistModel.findOneAndUpdate({id:updatePlaylistDto.id, userId:userId},{name:updatePlaylistDto.name, userId:userId});
    }
}