import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserDTO } from '../dto';

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

    private lobbyUsers: { [key: string]: Set<string> } = {};

    handleConnection() {
        // console.log('Client connected:', client.id);
    }
    
    handleDisconnect() {
        // console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('userUpdate')
    handleLobbyCreated(user: UserDTO): void {
        this.server.emit('userUpdate', user); 
    }

    @SubscribeMessage('joinLobby') 
    handleJoinLobby(client: Socket, {lobbyId, count}: {lobbyId: string, count: number}): void {
        client.join(lobbyId);
        console.log(`Client ${client.id} joined lobby: ${lobbyId}`);
        if (!this.lobbyUsers[lobbyId]) {
            this.lobbyUsers[lobbyId] = new Set();
        }
        this.lobbyUsers[lobbyId].add(client.id);
        console.log(this.lobbyUsers[lobbyId].size,'sssssdhhhhhhhssssssssssssssssssssss', count);
        
        // Проверка на полный лимит
        if (this.lobbyUsers[lobbyId].size >= count) { 
            this.server.to(lobbyId).emit('lobbyFull', { message: 'Lobby is full, starting the game!' });
            //  инициировать логику начала игры тут
        } else {
            this.server.to(lobbyId).emit('userJoined', { sender: 'System', message: `User ${client.id} has joined the lobby.` });
        }
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, { lobbyId, sender, text }: { lobbyId: string; sender: string; text: string }): void {
        this.server.to(lobbyId).emit('messages', { sender, text });
    }

    private removeUserFromLobby(clientId: string) {
        for (const lobbyId in this.lobbyUsers) {
            if (this.lobbyUsers[lobbyId].has(clientId)) {
                this.lobbyUsers[lobbyId].delete(clientId);
                
                this.server.to(lobbyId).emit('userLeft', { sender: 'System', message: `User ${clientId} has left the lobby.` });

                
                if (this.lobbyUsers[lobbyId].size === 0) {
                    delete this.lobbyUsers[lobbyId]; 
                }
            }
        }
    }
}