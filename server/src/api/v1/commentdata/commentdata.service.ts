import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CommentData } from './commentdata.entity';
import { Repository } from 'typeorm';
import { MbtiService } from '../mbti/mbti.service';

@Injectable()
export class CommentdataService {
  constructor(
    @Inject('COMMENTDATA_REPOSITORY')
    private commentRepository: Repository<CommentData>,
    private mbtiService: MbtiService,
  ) {}
  async createNewData(
    paramUserId: number,
    paramMbti: string,
    bodyData: any,
  ): Promise<CommentData> {
    const newData: CommentData = new CommentData();
    newData.host_id = paramUserId;
    newData.mbti = paramMbti;
    newData.like = bodyData.like;
    newData.comment = '';
    if (bodyData.comment !== undefined) {
      newData.comment = bodyData.comment;
    }
    return newData;
  }
  async countLikes(options: any): Promise<number> {
    const count = await this.commentRepository.count(options);
    return count;
  }
  async createComment(newData: CommentData): Promise<any> {
    const savecomment = await this.commentRepository.save(newData);
    const count = await this.countLikes({
      where: {
        host_id: newData.host_id,
        mbti: newData.mbti,
        like: newData.like,
      },
    });
    await this.mbtiService.updateLikes(newData.host_id, newData.mbti, count);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'api.common.created',
    };
  }
  async findComments(paramUserId: number, paramMbti: string): Promise<any[]> {
    const comments = await this.commentRepository.find({
      where: { host_id: paramUserId, mbti: paramMbti },
    });

    // 빈 문자열인 comment 속성을 제거하고 반환
    const filteredComments = comments.map((commentObject) => {
      if (commentObject.comment === '') {
        const { comment, ...rest } = commentObject;
        return rest;
      }
      return commentObject;
    });

    return filteredComments;
  }
}
