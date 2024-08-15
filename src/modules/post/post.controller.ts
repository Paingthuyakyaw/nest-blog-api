import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  createPostDto,
  createPostSchema,
  updatePostDto,
  updatePostScheam,
} from 'src/common/interface/post.schema';
import { ZodValidationPipe } from '../../common/pipe/zod.pipe';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ZodValidationPipe(createPostSchema)) payload: createPostDto,
  ) {
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
    const posts = await this.postService.post();
    if (!posts) {
      return {
        success: true,
        data: [],
      };
    }
    return {
      success: true,
      message: 'Fetching successfully',
      data: posts,
    };
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
  async update(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updatePostScheam)) payload: updatePostDto,
  ) {
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

  @Delete()
  async delete(@Body() { id }: { id: number }) {
    try {
      await this.postService.deletePost(id);
      return {
        success: true,
        message: 'Delete Successfully',
      };
    } catch (err) {
      console.log(err);

      throw new BadRequestException({
        success: false,
        message: err.meta.cause,
      });
    }
  }
}
