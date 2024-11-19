import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { LobbiModule } from '../lobbi/lobbi.module';

import { User } from '../user/models/user.model';
import { Lobbi } from '../lobbi/models/lobbi.model';
import { ConnectRoomModule } from '../connectRoom/connect-room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => ({
        dialect: 'postgres',
        host: configservice.get('db_host'),
        port: configservice.get('db_port'),
        username: configservice.get('db_user'),
        password: configservice.get('db_password'),
        database: configservice.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Lobbi]
      })
    }),
    UserModule,
    AuthModule,
    TokenModule,
    LobbiModule,
    ConnectRoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
