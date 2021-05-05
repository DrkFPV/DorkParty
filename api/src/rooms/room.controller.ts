import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateRoomDto } from "./dtos/create.room.dto";
import { RoomService } from "./room.service";
import { Room } from "./schemas/room.schema";

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private roomService:RoomService){
    }

    @Get('search')
    async findAll(@Query('q') q:string): Promise<Room[]> {
     
      return await this.roomService.search(q);
      //return await this.roomService.findAll();
    }

    @Post()
    async create(@Body() createRoom: CreateRoomDto): Promise<Room> {
      return await this.roomService.create(createRoom);
    }

    @Delete()
    async delete(@Param('id') id:string): Promise<Room> {
      return await this.roomService.delete(id);
    }

    @Get(':id')
    async findOne(@Param('id') roomId:string): Promise<Room>{
      return await this.roomService.findOne(roomId);
    }

    // @Put(':id')
    // update(@Body() UpdatePlaylistDto:UpdatePlaylistDto): any{
    //   return this.roomService.update(UpdatePlaylistDto);
    // }
}