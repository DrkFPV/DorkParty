import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersContoller } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])  ],
  controllers:[UsersContoller],
  providers: [UsersService],
  exports:[MongooseModule]
})
export class UsersModule {}