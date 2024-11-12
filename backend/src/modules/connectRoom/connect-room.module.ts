import { Module } from '@nestjs/common';
import { ConnectRoomService } from './connect-room.service';
import { ConnectRoomController } from './connect-room.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lobbi } from '../lobbi/models/lobbi.model';
import { UserLobby } from './models/userLobby.model';
import { User } from '../user/models/user.model';
import { WebsocketModule } from './socket/websocket.module';

@Module({
  imports: [SequelizeModule.forFeature([Lobbi, UserLobby, User]), WebsocketModule],
  providers: [ConnectRoomService],
  controllers: [ConnectRoomController]
})
export class ConnectRoomModule {}
