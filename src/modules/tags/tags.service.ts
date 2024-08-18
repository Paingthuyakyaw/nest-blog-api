import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createTagDto } from 'src/common/interface/tag.schema';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(payload: createTagDto): Promise<Tag> {
    return this.prisma.tag.create({
      data: {
        tag: payload.tag,
      },
    });
  }

  async update(payload: createTagDto, id: number) {
    return this.prisma.tag.update({
      where: {
        id: Number(id),
      },
      data: {
        tag: payload.tag,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.tag.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async getAll() {
    return this.prisma.tag.findMany();
  }

  async getById(id: number) {
    return this.prisma.tag.findFirstOrThrow({
      where: {
        id: Number(id),
      },
      include: {
        posts: true,
      },
    });
  }
}
