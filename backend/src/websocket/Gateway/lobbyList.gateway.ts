import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

export interface ILobbi {
    id: number,
    name: string,
    current: number,
    count: number,
    access: string,
    password?: string,
    createdAt: string,
    updatedAt: string
}

@WebSocketGateway({
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],         
      credentials: true,                 
    },
  })
  export class LobbyListGateway {
      @WebSocketServer()
      server: Server;
  
      @SubscribeMessage('lobbyCreated')
      handleLobbyCreated(lobby: ILobbi): void {
      this.server.emit('lobbyCreated', lobby); 
}

      @SubscribeMessage('lobbyDeleted')
      handleLobbyDeleted(lobbyId: number): void {
      this.server.emit('lobbyDeleted', lobbyId);
    }
  }