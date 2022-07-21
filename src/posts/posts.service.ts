import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreatePostInput, ICreatePostOutput } from './dtos/createPost.dto';
import {
  ICreatePostItemInput,
  ICreatePostItemOutput,
} from './dtos/createPostItem.dto';
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
  }: ICreatePostInput): Promise<ICreatePostOutput> {
    try {
      await this.prismaService.post.create({
        data: {
          name,
          thumbnail,
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

  async createPostItem({
    postId,
    poster,
  }: ICreatePostItemInput): Promise<ICreatePostItemOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
        },
      });
      if (!post) throw new Error('Not found Post by this Id');
      await this.prismaService.item.create({
        data: {
          poster,
          postId: post.id,
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
}
