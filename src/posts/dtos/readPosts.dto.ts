import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { PostEntity } from '../entities/post.entity';

@ObjectType()
export class IReadPostsOutput extends CoreOutput {
  @Field(() => [PostEntity], { nullable: true })
  posts?: PostEntity[];
}
