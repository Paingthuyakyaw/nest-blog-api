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
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  createPostDto,
  createPostSchema,
  updatePostDto,
  updatePostScheam,
} from 'src/common/interface/post.schema';
import { ZodValidationPipe } from '../../common/pipe/zod.pipe';
import { UserGuard } from '../auth/guard/user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body(new ZodValidationPipe(createPostSchema)) payload: createPostDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.data.id;
    const createdPost = await this.postService.createPost(
      payload,
      userId,
      file,
    );
    return {
      success: true,
      message: 'Post created successfully',
      data: createdPost,
    };
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query('page') page: number, @Query('size') size: number) {
    size = 10;
    const posts = await this.postService.post({ page, size: size });
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
      pagination: {
        page: page || 1,
        size,
        totalPage: Math.ceil(posts.length / size),
      },
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

  @UseGuards(UserGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updatePostScheam)) payload: updatePostDto,
    @Request() req,
  ) {
    const userId = req.user.data.id;
    const updateData = await this.postService.updatePost({
      data: payload,
      where: {
        id: Number(id),
      },
      userId,
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
