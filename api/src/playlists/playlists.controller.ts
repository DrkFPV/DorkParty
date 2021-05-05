import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { IUserAuthRequest } from 'src/auth/interfaces/userAuthRequest.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { IPlaylist } from './interfaces/playlist.interface';
import { PlaylistService } from './playlist.service';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';



@UseGuards(JwtAuthGuard)
@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistService:PlaylistService){

  }
    @Get()
    async findAll(): Promise<Playlist[]> {
      return await this.playlistService.findAll();
    }

    @Post()
    async create(@Body() createPlayListDto:CreatePlayListDto): Promise<Playlist> {
      return await this.playlistService.create(createPlayListDto);
    }

    @Delete()
    async delete(@Param('id') id:string): Promise<Playlist> {
      return await this.playlistService.delete(id);
    }

    @Get(':id')
    async findOne(@Param('id') playListId:string): Promise<Playlist>{
      return await this.playlistService.findOne(playListId);
    }

    @Put(':id')
    update(@Body() UpdatePlaylistDto:UpdatePlaylistDto): any{
      return this.playlistService.update(UpdatePlaylistDto);
    }
}
