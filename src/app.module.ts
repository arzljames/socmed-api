import { Module } from '@nestjs/common';
import { AuthModule } from './app/module/auth/auth.module';
import { PostModule } from './app/module/post/post.module';
import { UserModule } from './app/module/user/user.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, AuthModule, UserModule, PostModule],
  controllers: [],
})
export class AppModule {}
