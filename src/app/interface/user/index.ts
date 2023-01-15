import { RegisterUserDTO } from 'src/app/dto/auth';
import { User } from 'src/app/model/user/user.schema';

export abstract class AbstractUserRepository {
  abstract create(user: RegisterUserDTO): Promise<User | null>;
}

export abstract class AbstractUserService {
  abstract create(user: RegisterUserDTO): Promise<User | null>;
}
