import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { createPostDto } from 'src/common/interface/post.schema';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post({ page, size }: { page: number; size: number }): Promise<Post[]> {
    return this.prisma.post.findMany({
      skip: 0 < page ? size * (page - 1) : 0,
      take: size,
    });
  }

  async postById(id: number): Promise<Post> {
    return this.prisma.post.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        created_at: true,
        updated_at: true,
        user_id: true,
        image: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async createPost(
    payload: createPostDto,
    userId: number,
    file: Express.Multer.File,
  ): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: payload.title,
        description: payload.description,
        image: file.path,
        user: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });
  }

  async updatePost(params: {
    data: Prisma.PostUpdateInput;
    where: Prisma.PostWhereUniqueInput;
    userId: number;
    file: Express.Multer.File;
  }): Promise<Post> {
    const { data, where, userId, file } = params;
    return this.prisma.post.update({
      data: {
        title: data.title,
        description: data.description,
        created_at: data.created_at,
        updated_at: data.updated_at,
        image: file.path,
        user: {
          connect: {
            id: Number(userId),
          },
        },
      },
      where,
    });
  }

  async deletePost(id: number) {
    return this.prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
