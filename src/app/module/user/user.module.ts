import { Module } from '@nestjs/common';
import { UserService } from 'src/app/services/user/user.service';
import { UserSchemaModule } from 'src/app/model/user/user.schema.module';
import { UserRepository } from 'src/app/repository/user/user.repository';
import {
  AbstractUserRepository,
  AbstractUserService,
} from 'src/app/interface/user';
import { UserController } from 'src/app/controller/user/user.controller';
import { JwtStrategy } from 'src/app/services/auth/strategy/jwt.strategy';
import { JSONWebTokenModule } from 'src/config/jwt/jwt.module';
import { JSONWebTokenUtilModule } from '@util/jsonwebtoken/jsonwebtoken';

@Module({
  imports: [UserSchemaModule, JSONWebTokenModule, JSONWebTokenUtilModule],
  controllers: [UserController],
  providers: [
    { provide: AbstractUserRepository, useClass: UserRepository },
    { provide: AbstractUserService, useClass: UserService },
    JwtStrategy,
  ],
})
export class UserModule {}
