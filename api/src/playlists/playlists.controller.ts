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
    async findAll(@Req() req:IUserAuthRequest): Promise<Playlist[]> {
      return await this.playlistService.findAll(req.user.userId);
    }

    @Post()
    async create(@Body() createPlayListDto:CreatePlayListDto, @Req() req:IUserAuthRequest): Promise<Playlist> {
      return await this.playlistService.create(createPlayListDto, req.user.userId);
    }

    @Delete()
    async delete(@Param('id') id:string, @Req() req:IUserAuthRequest): Promise<Playlist> {
      return await this.playlistService.delete(id, req.user.userId);
    }

    @Get(':id')
    async findOne(@Param('id') playListId:string, @Req() req:IUserAuthRequest): Promise<Playlist>{
      return await this.playlistService.findOne(playListId, req.user.userId);
    }

    @Put(':id')
    update(@Body() UpdatePlaylistDto:UpdatePlaylistDto, @Req() req:IUserAuthRequest): any{
      return this.playlistService.update(UpdatePlaylistDto, req.user.userId);
    }
}
