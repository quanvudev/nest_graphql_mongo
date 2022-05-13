import { Field, ObjectType } from '@nestjs/graphql';

import { Base } from '@/commons/entities/Base';

@ObjectType()
export class User extends Base {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;
}
