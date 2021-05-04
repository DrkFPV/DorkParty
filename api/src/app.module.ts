import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SongModule } from './songs/songs.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlists/playlist.module';


@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal: true}), 
    MongooseModule.forRoot(process.env.MONGO_URI), 
    PlaylistModule, 
    AuthModule, 
    UsersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
