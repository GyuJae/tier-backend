import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ICreatePostInput, ICreatePostOutput } from './dtos/createPost.dto';
import {
  IReadPostItemsInput,
  IReadPostItemsOutput,
} from './dtos/readPostItems.dto';
import { IReadPostsOutput } from './dtos/readPosts.dto';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  @Query(() => IReadPostsOutput)
  async readPosts(): Promise<IReadPostsOutput> {
    return this.postService.readPosts();
  }

  @Query(() => IReadPostItemsOutput)
  async readPostItems(
    @Args('input') readPostItemsInput: IReadPostItemsInput,
  ): Promise<IReadPostItemsOutput> {
    return this.postService.readPostItems(readPostItemsInput);
  }

  @Mutation(() => ICreatePostOutput)
  async createPost(
    @Args('input') createPostInput: ICreatePostInput,
  ): Promise<ICreatePostOutput> {
    return this.postService.createPost(createPostInput);
  }
}
