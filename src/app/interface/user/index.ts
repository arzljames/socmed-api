import { LoginUserDTO, RegisterUserDTO } from 'src/app/dto/auth';
import { Express } from 'express';
import { User } from 'src/app/model/user/user.schema';

export abstract class AbstractUserRepository {
  abstract create(
    registerUserDto: RegisterUserDTO,
  ): Promise<CreatedUserResponse | null>;
  abstract login(loginUserDto: LoginUserDTO): Promise<LoginUserResponse>;
  abstract getUser(express: Express): Promise<User | null>;
}

export abstract class AbstractUserService {
  abstract create(
    registerUserDto: RegisterUserDTO,
  ): Promise<CreatedUserResponse | null>;
  abstract login(loginUserDto: LoginUserDTO): Promise<LoginUserResponse>;
  abstract getUser(express: Express): Promise<User | null>;
}

export interface CreatedUserResponse {
  _id: string;
  email: string;
  username: string;
  is_verfied?: boolean;
  is_new_user?: boolean;
  status: string;
  created_at: Date;
  updated_at: Date;
  profile: CreatedProfileInterface;
}

export interface LoginUserResponse {
  _id: string;
  email: string;
  username: string;
  is_verfied?: boolean;
  is_new_user?: boolean;
  status: string;
  access_token: string;
}

export interface CreatedProfileInterface {
  _id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  initials: string;
  profile_color: string;
  profile_photo?: ProfilePhoto;
  cover_photo?: ProfilePhoto;
  created_at?: Date;
  updated_at?: Date;
}

export interface AccessToken {
  access_token: string;
}

export interface ProfilePhoto {
  path: string;
  filename: string;
}

export interface CoverPhoto {
  path: string;
  filename: string;
}
