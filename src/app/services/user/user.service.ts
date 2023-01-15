import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from 'src/app/dto/auth';
import {
  AbstractUserRepository,
  AbstractUserService,
} from 'src/app/interface/user';
import { User } from 'src/app/model/user/user.schema';

@Injectable()
export class UserService implements AbstractUserService {
  constructor(private readonly repository: AbstractUserRepository) {}
  async create(user: RegisterUserDTO): Promise<User | null> {
    return await this.repository.create(user);
  }
}
