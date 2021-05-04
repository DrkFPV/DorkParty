
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule, 
    PassportModule, 
    JwtModule.register(
      {secret:process.env.JWT_SECRET, 
      signOptions:{expiresIn:'100m'}}
      )],
  providers: [
    AuthService, 
    UsersService,
    LocalStrategy,
    JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}