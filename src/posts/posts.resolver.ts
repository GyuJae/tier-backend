import { Query, Resolver } from '@nestjs/graphql';
import { IReadPostsOutput } from './dtos/readPosts.dto';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  @Query(() => IReadPostsOutput)
  async readPosts(): Promise<IReadPostsOutput> {
    return this.postService.readPosts();
  }
}
