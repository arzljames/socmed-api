import { Module } from '@nestjs/common';
import { AuthController } from 'src/app/controller/auth/auth.controller';
import {
  AbstractUserRepository,
  AbstractUserService,
} from 'src/app/interface/user';
import { UserSchemaModule } from 'src/app/model/user/user.schema.module';
import { UserRepository } from 'src/app/repository/user/user.repository';
import { UserService } from 'src/app/services/user/user.service';

@Module({
  imports: [UserSchemaModule],
  controllers: [AuthController],
  providers: [
    { provide: AbstractUserRepository, useClass: UserRepository },
    { provide: AbstractUserService, useClass: UserService },
  ],
})
export class AuthModule {}
