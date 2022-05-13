import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

import configs from '@/configs';
import { User, UserDocument } from '@/schemas/user.schema';

import { JWTAuth, JWTPayload } from '../types/jwt';

const {
  jwt: { secret },
} = configs();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JWTPayload): Promise<JWTAuth> {
    const user = await this.userModel.findOne({ _id: payload._id });
    if (!user)
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'JWT token is invalid',
        },
        HttpStatus.UNAUTHORIZED,
      );

    return { ...payload, user };
  }
}
