import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from '../auth/guard/user.guard';
import { createTagDto, createTagSchema } from 'src/common/interface/tag.schema';
import { TagsService } from './tags.service';
import { ZodValidationPipe } from 'src/common/pipe/zod.pipe';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @UseGuards(UserGuard)
  @HttpCode(201)
  @Post()
  async create(
    @Body(new ZodValidationPipe(createTagSchema)) payload: createTagDto,
  ) {
    try {
      const tag = await this.tagService.create(payload);
      return {
        success: true,
        data: tag,
        message: 'Tag created',
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Bad request',
      });
    }
  }

  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.tagService.getAll();
    return {
      success: true,
      data,
      message: 'All tags',
    };
  }

  @Get('id')
  async getById(@Param('id') id: number) {
    const data = this.tagService.getById(id);
    return {
      success: true,
      message: 'tag by Id',
      data,
    };
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  @HttpCode(200)
  async update(
    @Body(new ZodValidationPipe(createTagSchema)) payload: createTagDto,
    @Param('id') id: number,
  ) {
    try {
      const tag = await this.tagService.update(payload, id);
      return {
        success: true,
        data: tag,
        message: 'Tag update',
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Bad request',
      });
    }
  }
}
