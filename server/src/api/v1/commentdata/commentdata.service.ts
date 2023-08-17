import { Inject, Injectable } from '@nestjs/common';
import { CommentData } from './commentdata.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentdataService {
  constructor(
    @Inject('COMMENTDATA_REPOSITORY')
    private commentRepository: Repository<CommentData>,
  ) {}
  async createNewData(
    paramUserId: number,
    paramMbti: string,
    bodyData: any,
  ): Promise<CommentData> {
    const newData: CommentData = new CommentData();
    newData.userId = paramUserId;
    newData.mbti = paramMbti;
    newData.status = bodyData.status;
    newData.comment = bodyData.comment;
    return newData;
  }
  async createComment(newData: CommentData): Promise<CommentData> {
    return await this.commentRepository.save(newData);
  }
  // 미사용
  async findAll(options: any): Promise<CommentData[] | undefined> {
    const commentdata = await this.commentRepository.find(options);
    return commentdata || undefined;
  }
}
