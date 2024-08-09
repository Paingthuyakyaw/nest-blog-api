import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { postPayload } from './interface/post.interface';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() payload: postPayload) {
    const createdPost = await this.postService.createPost(payload);
    return {
      success: true,
      message: 'Post created successfully',
      data: createdPost,
    };
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return this.postService.post();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const postById = await this.postService.postById(id);
    return {
      success: true,
      message: 'Post by Id',
      data: postById,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: postPayload) {
    const updateData = await this.postService.updatePost({
      data: payload,
      where: {
        id: Number(id),
      },
    });

    return {
      success: true,
      message: 'Update Successfully',
      data: updateData,
    };
  }
}
