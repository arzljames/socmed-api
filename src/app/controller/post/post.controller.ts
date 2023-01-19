import {
  Controller,
  Get,
  Post as _Post,
  UseGuards,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDTO, ReactionsDTO } from 'src/app/dto/post';
import { JwtAuthGuard } from 'src/app/guard/auth/jwt-auth.guard';
import { AbstractPostService } from 'src/app/interface/post';
import { Post } from 'src/app/model/post/post.schema';
import { Request } from 'express';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: AbstractPostService) {}

  @Get()
  async getPost(): Promise<Post[] | null> {
    return await this.postService.getPost();
  }

  @_Post('create')
  async create(@Body() postDto: PostDTO): Promise<Post | null> {
    return await this.postService.create(postDto);
  }

  @UseGuards(JwtAuthGuard)
  @_Post(':id/reaction')
  async reaction(
    @Param('id') id: string,
    @Body() reaction: ReactionsDTO,
    @Req() request: Request,
  ): Promise<Post | null> {
    return await this.postService.reaction(id, reaction, request);
  }
}
