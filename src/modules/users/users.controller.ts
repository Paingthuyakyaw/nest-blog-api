import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  createUserDto,
  createUserSchema,
  userLoginDto,
  userLoginSchema,
} from 'src/common/interface/user.schema';
import { compare, hash } from 'bcrypt';
import { ZodValidationPipe } from 'src/common/pipe/zod.pipe';
import { UserGuard } from '../auth/guard/user.guard';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(UserGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('/login')
  async login(@Body(new ZodValidationPipe(userLoginSchema)) req: userLoginDto) {
    const user = await this.authService.loginUser(req);
    // console.log(user);
    if (user) {
      const comparePassword = await compare(req.password, user.password);
      if (!comparePassword) {
        throw new UnauthorizedException('Wrong Credential');
      }
      return this.authService.getUserToken(user);
    }
    return user;
    // return this.authService.getUserToken();
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createUserSchema)) payload: createUserDto,
  ) {
    const user = await this.userService.createUser({
      name: payload.name,
      email: payload.email,
      password: (await hash(payload.password, 10)).toString(),
    });
    return {
      success: true,
      message: 'User Create',
      data: user,
    };
  }

  @Get()
  async getAll() {
    const user = await this.userService.getAll();
    return {
      success: true,
      message: 'Fetched all users',
      data: user,
    };
  }
}
