import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { createUserDto, updateUserDto } from 'src/common/interface/user.schema';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: createUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getById(id: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
  }

  async updateUser(params: { data: updateUserDto; id: number }): Promise<User> {
    const { data, id } = params;
    return this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }
}
