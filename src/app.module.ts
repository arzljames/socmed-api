import { Module } from '@nestjs/common';
import { AuthController } from './app/controller/auth/auth.controller';
import { AuthModule } from './app/module/auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [],
})
export class AppModule {}
