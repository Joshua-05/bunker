import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],         
      credentials: true,                 
    },
  })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }
    
    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('joinLobby') 
    handleJoinLobby(client: Socket, lobbyId: string): void {
        client.join(lobbyId);
        console.log(`Client ${client.id} joined lobby: ${lobbyId}`);
        this.server.to(lobbyId).emit('userJoined', { sender: 'System', message: `User ${client.id} has joined the lobby.` });
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, { lobbyId, sender, text }: { lobbyId: string; sender: string; text: string }): void {
        this.server.to(lobbyId).emit('message', { sender, text });
    }
}