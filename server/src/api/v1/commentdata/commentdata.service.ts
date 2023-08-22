import { Inject, Injectable } from '@nestjs/common';
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
    newData.comment = bodyData.comment;
    return newData;
  }
  async countLikes(options: any): Promise<number> {
    const count = await this.commentRepository.count(options);
    return count;
  }
  async createComment(newData: CommentData): Promise<CommentData> {
    const savecomment = await this.commentRepository.save(newData);
    const count = await this.countLikes({
      where: {
        host_id: newData.host_id,
        mbti: newData.mbti,
        like: newData.like,
      },
    });
    await this.mbtiService.updateLikes(newData.host_id, newData.mbti, count);
    return savecomment;
  }
  async findComments(
    paramUserId: number,
    paramMbti: string,
  ): Promise<CommentData[]> {
    return await this.commentRepository.find({
      where: { host_id: paramUserId, mbti: paramMbti },
    });
  }
}
