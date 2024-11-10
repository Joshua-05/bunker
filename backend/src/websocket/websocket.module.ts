import { Module } from '@nestjs/common';
import { ChatGateway } from './Gateway/chat.gateway';
import { LobbyListGateway } from './Gateway/lobbyList.gateway';
import { GameGateway } from './Gateway/game.gateway';

@Module({
  providers: [ChatGateway, LobbyListGateway, GameGateway],
  exports: [LobbyListGateway]
})
export class WebsocketModule {}
