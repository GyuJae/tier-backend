import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { ItemEntity } from '../entities/post.entity';

@InputType()
export class ICreatePostItemInput extends PickType(
  ItemEntity,
  ['poster'],
  InputType,
) {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class ICreatePostItemOutput extends CoreOutput {}
