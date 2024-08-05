import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PostService } from './post/post.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, PostService],
})
export class AppModule {}
