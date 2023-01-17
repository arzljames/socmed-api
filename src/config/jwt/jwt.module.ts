import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JSONWebTokenService } from './jwt.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useClass: JSONWebTokenService,
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JSONWebTokenModule {}
