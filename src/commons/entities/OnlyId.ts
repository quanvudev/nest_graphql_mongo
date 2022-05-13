import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OnlyId {
  @Field(() => ID, { nullable: false })
  _id: string;
}
