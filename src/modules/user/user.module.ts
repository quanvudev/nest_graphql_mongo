import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import configs from '@/configs';
import { ConnectionType } from '@/configs/enums';
import { JwtStrategy } from '@/guards/strategies/jwt.strategy';
import { User, UserSchema } from '@/schemas/user.schema';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const {
  jwt: { secret, expiresIn },
} = configs();

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      ConnectionType.APP,
    ),
    JwtModule.register({
      secret,
      signOptions: { expiresIn },
    }),
  ],
  providers: [UserResolver, UserService, JwtStrategy],
})
export class UserModule {}
