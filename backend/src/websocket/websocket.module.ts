import { Module } from '@nestjs/common';
import { ChatGateway } from './Gateway/chat.gateway';
import { LobbyListGateway } from './Gateway/lobbyList.gateway';

@Module({
  providers: [ChatGateway, LobbyListGateway]
})
export class WebsocketModule {}
