import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostDTO, ReactionsDTO } from 'src/app/dto/post';
import { Model } from 'mongoose';
import { AbstractPostRepository } from 'src/app/interface/post';
import { Post, PostDocument } from 'src/app/model/post/post.schema';
import * as _ from 'lodash';
import { Request } from 'express';
import { Schema as MongooseSchema } from '@nestjs/mongoose';

@Injectable()
export class PostRepository implements AbstractPostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async create(postDto: PostDTO): Promise<Post | null> {
    const createPost = new this.postModel(postDto);
    return await createPost.save();
  }

  async getPost(): Promise<Post[] | null> {
    return await this.postModel
      .find({})
      .sort({ created_at: -1 })
      .populate({
        path: 'author',
        select: { password: 0 },
        populate: {
          path: 'profile',
        },
      })

      .lean();
  }

  async reaction(
    id: string,
    reactionDto: ReactionsDTO,
    request: Request,
  ): Promise<Post | null> {
    const findPost = await this.postModel.findOne({ _id: id });

    if (!findPost) throw new BadRequestException('Unable to find post');

    let { reactions } = findPost;
    const { user } = request as any;

    const findReaction = _.find(reactions, { reactor: user._id });

    // mutations happen here
    // reaction to post
    if (!findReaction) {
      reactions = [
        ...reactions,
        { reactor: user._id, reaction: reactionDto.reaction },
      ];
      findPost.reactions = reactions;
      return await findPost.save();
    }

    reactions = _.remove(reactions, { reactor: user._id.toString() });
    findPost.reactions = reactions;

    return await findPost.save();
  }
}
