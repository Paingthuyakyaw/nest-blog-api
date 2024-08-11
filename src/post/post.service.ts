import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { createPostDto } from 'src/common/interface/post.schema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async postById(id: number): Promise<Post> {
    return this.prisma.post.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
  }

  async createPost(payload: createPostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: payload.title,
        description: payload.description,
      },
    });
  }

  async updatePost(params: {
    data: Prisma.PostUpdateInput;
    where: Prisma.PostWhereUniqueInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }
}
