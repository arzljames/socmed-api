import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from 'src/app/dto/auth';
import {
  AbstractUserRepository,
  AbstractUserService,
  CreatedUserResponse,
} from 'src/app/interface/user';

@Injectable()
export class UserService implements AbstractUserService {
  constructor(private readonly repository: AbstractUserRepository) {}
  async create(user: RegisterUserDTO): Promise<CreatedUserResponse | null> {
    return await this.repository.create(user);
  }
}
