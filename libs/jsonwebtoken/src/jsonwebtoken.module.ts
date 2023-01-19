import { Module } from '@nestjs/common';
import { JSONWebTokenModule } from 'src/config/jwt/jwt.module';
import { JSONWebTokenUtilService } from './jsonwebtoken.service';

@Module({
  imports: [JSONWebTokenModule],
  providers: [JSONWebTokenUtilService],
  exports: [JSONWebTokenUtilService],
})
export class JSONWebTokenUtilModule {}
