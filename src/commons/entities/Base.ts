import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Base {
  @Field(() => ID)
  _id: string;

  @Field({
    nullable: true,
    name: 'createdAt',
  })
  createdAt?: Date;

  @Field({
    nullable: true,
    name: 'updatedAt',
  })
  updatedAt?: Date;
}
