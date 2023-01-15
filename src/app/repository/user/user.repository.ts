import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from 'src/app/dto/auth';
import {
  AbstractUserRepository,
  CreatedUserResponse,
} from 'src/app/interface/user';
import { User, UserDocument } from 'src/app/model/user/user.schema';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { DEFAULT_PROFILE_COLORS } from 'src/app/const';
import { Profile, ProfileDocument } from 'src/app/model/profile/profile.schema';

@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}
  async create(user: RegisterUserDTO): Promise<CreatedUserResponse | null> {
    const { email, username, password, first_name, last_name } = user as any;
    const hashPassword = await this.hashPassword(password);
    const profileColor = this.pickProfileColor();

    const createUser = await this.userModel.create({
      email,
      username,
      password: hashPassword,
    });
    const createProfile = await this.profileModel.create({
      first_name: this.capitalizeWord(first_name),
      last_name: this.capitalizeWord(last_name),
      initials: this.getInitials(first_name, last_name),
      profile_color: profileColor,
    });

    createUser.profile = createProfile._id;
    createUser.save();
    createProfile.save();

    return await this.userModel
      .findById({ _id: createUser._id }, { password: 0 })
      .populate('profile')
      .lean();
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
