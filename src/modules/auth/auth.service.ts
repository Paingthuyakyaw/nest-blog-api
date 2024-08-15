import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { createUserDto, userLoginDto } from 'src/common/interface/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async verifyUser(email: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return {
      success: true,
      message: 'User is valid',
      data: result,
    };
  }

  async getUserToken(user: createUserDto) {
    const { name, email } = user;
    return {
      access_token: this.jwt.sign({ name, email }),
    };
  }

  async loginUser({ email }: userLoginDto) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });
  }
}
