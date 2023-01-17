import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { JSONWebTokenModule } from './jwt/jwt.module';

@Module({
  imports: [
    _ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    JSONWebTokenModule,
  ],
})
export class ConfigModule {}
