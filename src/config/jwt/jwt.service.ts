import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JSONWebTokenService {
  constructor(private readonly configService: ConfigService) {}

  //You can retrun promise as well
  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '3600s' },
    };
  }
}
