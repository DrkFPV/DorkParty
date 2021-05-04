import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersContoller {
  constructor(private userService:UsersService){

  }
    @Post()
    async create(@Body() registerDto:RegisterDto): Promise<UserDocument> {
      return await this.userService.register(registerDto);
    }
}
