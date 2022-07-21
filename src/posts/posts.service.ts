import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreatePostInput, ICreatePostOutput } from './dtos/createPost.dto';
import {
  IReadPostItemsInput,
  IReadPostItemsOutput,
} from './dtos/readPostItems.dto';
import { IReadPostsOutput } from './dtos/readPosts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async readPosts(): Promise<IReadPostsOutput> {
    try {
      const posts = await this.prismaService.post.findMany();
      return {
        ok: true,
        posts,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async createPost({
    name,
    thumbnail,
    items,
  }: ICreatePostInput): Promise<ICreatePostOutput> {
    try {
      if (items.length === 0) throw new Error('Required Item');

      await this.prismaService.post.create({
        data: {
          name,
          thumbnail,
          items: {
            createMany: {
              data: items,
            },
          },
        },
        select: {
          id: true,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async readPostItems({
    postId,
  }: IReadPostItemsInput): Promise<IReadPostItemsOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
        },
      });
      if (!post) throw new Error('Not Found Post');
      const items = await this.prismaService.item.findMany({
        where: {
          postId: post.id,
        },
      });
      return {
        ok: true,
        items,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
