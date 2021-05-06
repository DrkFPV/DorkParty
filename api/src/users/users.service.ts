
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { UserDocument } from './schemas/user.schema';

// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<UserDocument | any > {// Promise<User | undefined> {
    return this.userModel.findOne({username:username});
  }

  async findOneWithPass(username: string): Promise<UserDocument | undefined> {// Promise<User | undefined> {
    return this.userModel.findOne({username:username}).select('hash');
  }

  async register(registerUserDto: RegisterDto): Promise<UserDocument | undefined> {
    
    const hash = await bcrypt.hash(registerUserDto.password, 10)    
    return await this.userModel.create({ username: registerUserDto.username, hash:hash  }); 
  }
}
