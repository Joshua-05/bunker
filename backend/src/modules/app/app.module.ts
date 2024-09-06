import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations';
import { User } from '../user/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { LobbiModule } from '../lobbi/lobbi.module';

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
        models: [User]
      })
    }),
    UserModule,
    AuthModule,
    TokenModule,
    LobbiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
