import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Укажите URL вашего клиента
    methods: ['GET', 'POST'],         // Разрешенные методы
    credentials: true,                 // Разрешение на использование куки или авторизации (если необходимо)
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

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: { sender: string; text: string }): void {
        this.server.emit('message', payload); // Отправка сообщения всем подключенным клиентам
    }
}