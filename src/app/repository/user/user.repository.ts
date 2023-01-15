import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Model } from 'mongoose';
import { RegisterUserDTO } from 'src/app/dto/auth';
import { AbstractUserRepository } from 'src/app/interface/user';
import { User, UserDocument } from 'src/app/model/user/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(user: RegisterUserDTO): Promise<User | null> {
    const createdUser = await this.userModel.create(user);

    return createdUser;
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
}
