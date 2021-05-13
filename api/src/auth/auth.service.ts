
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user:UserDocument = await this.usersService.findOneWithPass(username);
    if (user &&await bcrypt.compare(pass, user?.hash)) {
      return  {sub:user.id, username:user.username}
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.sub };
    let expireDate = new Date();
    expireDate.setHours( expireDate.getHours() + 1)
    return {
      accessToken: this.jwtService.sign(payload),
      expiresAt: expireDate
    };
  }
}