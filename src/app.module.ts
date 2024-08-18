import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { PostService } from './modules/post/post.service';
import { PostController } from './modules/post/post.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersService } from './modules/users/users.service';
import { UsersController } from './modules/users/users.controller';
import { PostModule } from './modules/post/post.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [AuthModule, PostModule, UsersModule, PrismaModule, TagsModule],
  controllers: [AppController, PostController, UsersController],
  providers: [AppService, PrismaService, PostService, UsersService],
})
export class AppModule {}
