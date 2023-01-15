import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
  ],
})
export class DatabaseModule {}
