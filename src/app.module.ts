import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { DateScalar } from '@/commons/Scalars/DateScalar';
import config from '@/configs';
import { ConnectionType } from '@/configs/enums';

import { UserModule } from './modules/user/user.module';

const appConfig = config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRoot(appConfig.database.mongo, {
      connectionName: ConnectionType.APP,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
