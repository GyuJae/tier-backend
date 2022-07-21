import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
}
