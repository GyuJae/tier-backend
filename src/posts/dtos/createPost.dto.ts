import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { ItemEntity, PostEntity } from '../entities/post.entity';

@InputType()
class ICreateItemInput extends PickType(
  ItemEntity,
  ['name', 'poster'],
  InputType,
) {}

@InputType()
export class ICreatePostInput extends PickType(
  PostEntity,
  ['name', 'thumbnail'],
  InputType,
) {
  @Field(() => [ICreateItemInput])
  items: ICreateItemInput[];
}

@ObjectType()
export class ICreatePostOutput extends CoreOutput {}
