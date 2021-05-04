import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistSchema } from '../playlists/schemas/playlist.schema';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Playlist', schema: PlaylistSchema }]), HttpModule],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongModule {}
