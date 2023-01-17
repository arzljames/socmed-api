import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDTO, RegisterUserDTO } from 'src/app/dto/auth';
import {
  AbstractUserRepository,
  CreatedUserResponse,
  LoginUserResponse,
} from 'src/app/interface/user';
import { User, UserDocument } from 'src/app/model/user/user.schema';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { DEFAULT_PROFILE_COLORS } from 'src/app/const';
import { Profile, ProfileDocument } from 'src/app/model/profile/profile.schema';
import { JSONWebTokenUtilService } from '@util/jsonwebtoken/jsonwebtoken';
import { Express } from 'express';

@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private readonly JwtUtilService: JSONWebTokenUtilService,
  ) {}

  // create user account
  async create(user: RegisterUserDTO): Promise<CreatedUserResponse | null> {
    const { email, username, password, first_name, last_name } = user as any;
    const hashPassword = await this.hashPassword(password);
    const profileColor = this.pickProfileColor();
    const findExistingUserByUsername = await this.userModel.findOne({
      username,
    });
    const findExistingUserByEmail = await this.userModel.findOne({ email });

    if (findExistingUserByUsername)
      throw new BadRequestException('Username already exist');
    if (findExistingUserByEmail)
      throw new BadRequestException('Email already exist');

    const newProfile = await this.profileModel.create({
      first_name: this.capitalizeWord(first_name),
      last_name: this.capitalizeWord(last_name),
      initials: this.getInitials(first_name, last_name),
      profile_color: profileColor,
    });

    if (!newProfile)
      throw new InternalServerErrorException('Unable to create user account');

    const newUser = await this.userModel.create({
      email,
      username,
      password: hashPassword,
      profile: newProfile._id,
    });

    const createdUser = await this.userModel
      .findOne({ _id: newUser._id }, { password: 0 })
      .populate('profile')
      .lean();

    return createdUser;
  }

  async login(loginUserDto: LoginUserDTO): Promise<LoginUserResponse> {
    const findUser = await this.userModel.findOne({
      username: loginUserDto.username,
    });

    if (_.isNil(findUser))
      throw new BadRequestException('Incorrect username or password');

    const compare = await this.comparePassword(
      loginUserDto.password,
      findUser.password,
    );

    if (!compare)
      throw new BadRequestException('Incorrect username or password');

    const { _id, email, is_verified, username, status } = findUser;
    const payload = { _id, email };

    const { access_token } = this.JwtUtilService.generateJWT(payload);
    const response = {
      _id,
      email,
      username,
      is_verified,
      status,
      access_token,
    };
    return response;
  }

  async getUser(express: Express): Promise<User | null> {
    const { user } = express as any;
    return user;
  }

  private async hashPassword(password: string): Promise<string | null> {
    if (password) {
      const saltRounds: number = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    }
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean | null> {
    if (password && hashedPassword) {
      const compare: boolean = await bcrypt.compare(password, hashedPassword);
      return compare;
    }
  }

  private pickProfileColor(): string {
    const randomNumber = _.random(0, 5);
    const randomColor = _.filter(
      DEFAULT_PROFILE_COLORS,
      (_item: Array<string>, index: number) => {
        return index === randomNumber;
      },
    );

    return randomColor[0];
  }

  private capitalizeWord = (word: string): string => {
    if (word) {
      const separatedWord = word.split(' ');

      for (let i = 0; i < separatedWord.length; i++) {
        separatedWord[i] =
          separatedWord[i].charAt(0).toUpperCase() + separatedWord[i].slice(1);
      }

      return separatedWord.join(' ');
    }
  };

  private getInitials = (firstname: string, lastname: string): string => {
    if (firstname && lastname) {
      return (
        firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
      );
    }
  };
}
