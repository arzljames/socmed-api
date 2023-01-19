import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from 'src/app/model/user/user.schema';
import { Model } from 'mongoose';
import * as _ from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(TokenPayload: {
    email: string;
    sub: string;
  }): Promise<User | null> {
    const user = await this.userModel
      .findOne({ email: TokenPayload.email }, { password: 0 })
      .populate('profile')
      .lean();

    if (_.isNil(user)) {
      throw new UnauthorizedException(
        'Unauthorize access. Invalid token or expired',
      );
    }
    return user;
  }
}
