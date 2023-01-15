import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    _ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
  ],
})
export class ConfigModule {}
