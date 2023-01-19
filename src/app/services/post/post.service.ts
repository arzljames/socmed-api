import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PostDTO, ReactionsDTO } from 'src/app/dto/post';
import {
  AbstractPostRepository,
  AbstractPostService,
} from 'src/app/interface/post';
import { Post } from 'src/app/model/post/post.schema';

@Injectable()
export class PostService implements AbstractPostService {
  constructor(private readonly repository: AbstractPostRepository) {}
  async getPost(): Promise<Post[] | null> {
    return await this.repository.getPost();
  }

  async create(postDto: PostDTO): Promise<Post | null> {
    return await this.repository.create(postDto);
  }

  async reaction(
    id: string,
    reactionDto: ReactionsDTO,
    request: Request,
  ): Promise<Post> {
    return await this.repository.reaction(id, reactionDto, request);
  }
}
