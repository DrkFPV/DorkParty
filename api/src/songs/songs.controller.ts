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
    async findOne(@Query('q') q:string): Promise<YoutubeSongDto[]>{
        let resultList:YoutubeSongDto[] = []        
        if(!q){
            return [];
        }
        resultList = (await this.songsService.searchYoutube(q)).data;
        return resultList
    }

    @Post('add-to-playlist')
    async AddSong(@Body() song:AddSongDto): Promise<PlaylistDocument>{
        return await this.songsService.addSong(song);
    }

    @Delete('remove-from-playlist')
    async RemoveSong(@Body() song:RemoveSongDto): Promise<PlaylistDocument>{
        return await this.songsService.removeSong(song);
    }
}
