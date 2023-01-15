import { RegisterUserDTO } from 'src/app/dto/auth';

export abstract class AbstractUserRepository {
  abstract create(user: RegisterUserDTO): Promise<CreatedUserResponse | null>;
}

export abstract class AbstractUserService {
  abstract create(user: RegisterUserDTO): Promise<CreatedUserResponse | null>;
}

export interface CreatedUserResponse {
  _id: string;
  email: string;
  username: string;
  is_verfied: boolean;
  status: string;
  created_at: Date;
  updated_at: Date;
  profile: CreatedProfileInterface;
}

export interface CreatedProfileInterface {
  _id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  initials: string;
  profile_color: string;
  created_at: Date;
  updated_at: Date;
}
