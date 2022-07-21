import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Item, Post } from '@prisma/client';
import { CoreEntity } from 'src/core/entities/core.entity';

@ObjectType()
export class ItemEntity extends CoreEntity implements Item {
  @Field(() => String)
  poster: string;

  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class PostEntity extends CoreEntity implements Post {
  @Field(() => String)
  name: string;

  @Field(() => String)
  thumbnail: string;
}
