import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistsController } from './playlists.controller';
import { PlaylistService } from './playlist.service';
import { PlaylistSchema } from './schemas/playlist.schema';
import { SongModule } from '../songs/songs.module';

@Module({
  imports: [   SongModule,
  MongooseModule.forFeature([{ name: 'Playlist', schema: PlaylistSchema }])  
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
 