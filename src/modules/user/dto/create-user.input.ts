import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({
    nullable: false,
  })
  name: string;

  @Field({
    nullable: false,
  })
  email: string;

  @Field({
    nullable: false,
  })
  password: string;
}
