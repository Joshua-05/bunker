import { Module } from '@nestjs/common';
import { LobbiController } from './lobbi.controller';
import { LobbiService } from './lobbi.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lobbi } from './models/lobbi.model';
import { UserLobby } from '../connectRoom/models/userLobby.model';
import { User } from '../user/models/user.model';
import { WebsocketModule } from './socket/websocket.module';

@Module({
  imports: [SequelizeModule.forFeature([Lobbi, UserLobby, User]), WebsocketModule],
  controllers: [LobbiController],
  providers: [LobbiService]
})
export class LobbiModule {}
