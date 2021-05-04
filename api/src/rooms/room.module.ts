import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomSchema } from './schemas/room.schema';


@Module({
  imports:[MongooseModule.forFeature([{ name: 'room', schema: RoomSchema }])  ],
  controllers:[RoomController],
  providers: [RoomService],
  exports:[]
})
export class RoomsModule {}