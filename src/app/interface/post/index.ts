import { Request } from 'express';
import { PostDTO, ReactionsDTO } from 'src/app/dto/post';
import { Post } from 'src/app/model/post/post.schema';

export abstract class AbstractPostRepository {
  abstract getPost(): Promise<Post[] | null>;
  abstract create(postDto: PostDTO): Promise<Post | null>;
  abstract reaction(
    id: string,
    reactionDto: ReactionsDTO,
    request: Request,
  ): Promise<Post | null>;
}

export abstract class AbstractPostService {
  abstract getPost(): Promise<Post[] | null>;
  abstract create(postDto: PostDTO): Promise<Post | null>;
  abstract reaction(
    id: string,
    reactionDto: ReactionsDTO,
    request: Request,
  ): Promise<Post | null>;
}
