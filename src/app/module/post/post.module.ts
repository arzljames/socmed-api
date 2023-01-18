import { Module } from '@nestjs/common';

import { PostController } from 'src/app/controller/post/post.controller';
import {
  AbstractPostRepository,
  AbstractPostService,
} from 'src/app/interface/post';
import { PostSchemaModule } from 'src/app/model/post/post.schema.module';
import { PostRepository } from 'src/app/repository/post/post.repository';

import { PostService } from 'src/app/services/post/post.service';

@Module({
  imports: [PostSchemaModule],
  controllers: [PostController],
  providers: [
    { provide: AbstractPostRepository, useClass: PostRepository },
    { provide: AbstractPostService, useClass: PostService },
  ],
})
export class PostModule {}
