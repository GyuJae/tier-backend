import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { ItemEntity } from '../entities/post.entity';

@InputType()
export class IReadPostItemsInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class IReadPostItemsOutput extends CoreOutput {
  @Field(() => [ItemEntity], { nullable: true })
  items?: ItemEntity[];
}
