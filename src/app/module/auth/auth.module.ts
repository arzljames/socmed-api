import { Module } from '@nestjs/common';
import { JSONWebTokenUtilModule } from '@util/jsonwebtoken/jsonwebtoken';
import { AuthController } from 'src/app/controller/auth/auth.controller';

import {
  AbstractUserRepository,
  AbstractUserService,
} from 'src/app/interface/user';
import { UserSchemaModule } from 'src/app/model/user/user.schema.module';
import { UserRepository } from 'src/app/repository/user/user.repository';
import { JwtStrategy } from 'src/app/services/auth/strategy/jwt.strategy';
import { UserService } from 'src/app/services/user/user.service';
import { JSONWebTokenModule } from 'src/config/jwt/jwt.module';

@Module({
  imports: [UserSchemaModule, JSONWebTokenModule, JSONWebTokenUtilModule],
  controllers: [AuthController],
  providers: [
    { provide: AbstractUserRepository, useClass: UserRepository },
    { provide: AbstractUserService, useClass: UserService },
    JwtStrategy,
  ],
})
export class AuthModule {}
