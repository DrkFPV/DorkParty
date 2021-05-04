import { Controller, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RoomService } from "./room.service";

@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private roomService:RoomService){
    }
    //  @Post()
    //  async create(@Body() registerDto:RegisterDto): Promise<UserDocument> {
    //    return await this.userService.register(registerDto);
    //  }
}