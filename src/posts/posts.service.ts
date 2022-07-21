import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreatePostInput, ICreatePostOutput } from './dtos/createPost.dto';
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

      const post = await this.prismaService.post.create({
        data: {
          name,
          thumbnail,
        },
        select: {
          id: true,
        },
      });
      await this.prismaService.item.createMany({
        data: items.map((item) => ({ ...item, postId: post.id })),
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
