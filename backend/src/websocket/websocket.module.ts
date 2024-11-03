import { Module } from '@nestjs/common';
import { ChatGateway } from './Gateway/chat.gateway';
import { LobbyListGateway } from './Gateway/lobbyList.gateway';

@Module({
  providers: [ChatGateway, LobbyListGateway],
  exports: [LobbyListGateway]
})
export class WebsocketModule {}
