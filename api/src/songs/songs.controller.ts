import { Body, Controller, Delete, Get, HttpService, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { IUserAuthRequest } from 'src/auth/interfaces/userAuthRequest.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PlaylistDocument } from 'src/playlists/schemas/playlist.schema';
import { AddSongDto } from './dto/add-song.dto';
import { RemoveSongDto } from './dto/remove-song.dto';
import { YoutubeSongDto } from './dto/youtube-song.dto';
import { SongsService } from './songs.service';

@UseGuards(JwtAuthGuard)
@Controller('songs')
export class SongsController {
    constructor(private songsService:SongsService){}

    @Get('search')
    async findOne(@Query('q') q:string, @Req() req:IUserAuthRequest): Promise<YoutubeSongDto[]>{
        let resultList:YoutubeSongDto[] = []        
        if(!q){
            return [];
        }
        resultList = (await this.songsService.searchYoutube(q)).data;
        return resultList
    }

    @Post('add-to-playlist')
    async AddSong(@Body() song:AddSongDto, @Req() req:IUserAuthRequest): Promise<PlaylistDocument>{
        return await this.songsService.addSong(song, req.user.userId);
    }

    @Delete('remove-from-playlist')
    async RemoveSong(@Body() song:RemoveSongDto, @Req() req:IUserAuthRequest): Promise<PlaylistDocument>{
        return await this.songsService.removeSong(song, req.user.userId);
    }
}
