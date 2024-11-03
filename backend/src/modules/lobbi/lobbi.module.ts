import { Module } from '@nestjs/common';
import { LobbiController } from './lobbi.controller';
import { LobbiService } from './lobbi.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lobbi } from './models/lobbi.model';
import { UserLobby } from './models/userLobby.model';

@Module({
  imports: [SequelizeModule.forFeature([Lobbi, UserLobby])],
  controllers: [LobbiController],
  providers: [LobbiService]
})
export class LobbiModule {}
