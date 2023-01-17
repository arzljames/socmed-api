import { Module } from '@nestjs/common';
import { AuthModule } from './app/module/auth/auth.module';
import { UserModule } from './app/module/user/user.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, AuthModule, UserModule],
  controllers: [],
})
export class AppModule {}
