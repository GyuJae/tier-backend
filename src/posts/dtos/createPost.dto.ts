import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { PostEntity } from '../entities/post.entity';

@InputType()
export class ICreatePostInput extends PickType(
  PostEntity,
  ['name', 'thumbnail'],
  InputType,
) {}

@ObjectType()
export class ICreatePostOutput extends CoreOutput {}
