import { Module } from '@nestjs/common';
import { LobbiController } from './lobbi.controller';
import { LobbiService } from './lobbi.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lobbi } from './models/lobbi.model';

@Module({
  imports: [SequelizeModule.forFeature([Lobbi])],
  controllers: [LobbiController],
  providers: [LobbiService]
})
export class LobbiModule {}
