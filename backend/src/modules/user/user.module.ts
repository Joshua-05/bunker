import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Lobbi } from '../lobbi/models/lobbi.model';
import { UserLobby } from '../lobbi/models/userLobby.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Lobbi, UserLobby])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
