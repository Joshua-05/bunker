import { Module } from '@nestjs/common';
import { ConnectRoomService } from './connect-room.service';
import { ConnectRoomController } from './connect-room.controller';

@Module({
  providers: [ConnectRoomService],
  controllers: [ConnectRoomController]
})
export class ConnectRoomModule {}
