import { Injectable } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from 'src/app/dto/auth';
import {
  AbstractUserRepository,
  AbstractUserService,
  CreatedUserResponse,
  LoginUserResponse,
} from 'src/app/interface/user';
import { Express } from 'express';
import { User } from 'src/app/model/user/user.schema';

@Injectable()
export class UserService implements AbstractUserService {
  constructor(private readonly repository: AbstractUserRepository) {}
  async create(
    registerUserDto: RegisterUserDTO,
  ): Promise<CreatedUserResponse | null> {
    return await this.repository.create(registerUserDto);
  }

  async login(loginUserDto: LoginUserDTO): Promise<LoginUserResponse> {
    return await this.repository.login(loginUserDto);
  }

  async getUser(express: Express): Promise<User | null> {
    return await this.repository.getUser(express);
  }
}
