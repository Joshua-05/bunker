import { Module } from '@nestjs/common';
import { LobbiController } from './lobbi.controller';
import { LobbiService } from './lobbi.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lobbi } from './models/lobbi.model';
import { UserLobby } from './models/userLobby.model';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [SequelizeModule.forFeature([Lobbi, UserLobby]), WebsocketModule],
  controllers: [LobbiController],
  providers: [LobbiService]
})
export class LobbiModule {}
