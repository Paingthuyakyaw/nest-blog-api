import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [AppController, PostController],
  providers: [AppService, PrismaService, PostService],
})
export class AppModule {}
