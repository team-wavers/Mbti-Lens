import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CommentData } from './commentdata.entity';
import { Repository } from 'typeorm';
import { MbtiService } from '../mbti/mbti.service';
import { UsersService } from '../users/users.service';
import { StandardResponseDto } from 'src/dto/standard-response.dto';

@Injectable()
export class CommentdataService {
  constructor(
    @Inject('COMMENTDATA_REPOSITORY')
    private commentRepository: Repository<CommentData>,
    private mbtiService: MbtiService,
    private usersService: UsersService,
  ) {}
  async createNewData(
    paramUserId: number,
    bodyData: any,
    public_key: string,
  ): Promise<any> {
    //check_key를 통해 public_key가 유효한지 확인
    const check_key = await this.usersService.findOne({
      select: ['public_key'],
      where: { _id: paramUserId },
    });
    if (check_key?.public_key !== public_key) {
      throw new BadRequestException('public_key not found');
    }
    for (const item of bodyData) {
      if (!item.mbti || typeof item.mbti !== 'string') {
        throw new BadRequestException('mbti data not found');
      }
      if (item.like === undefined || typeof item.like !== 'boolean') {
        throw new BadRequestException('like data not found');
      }
      const mbti = item.mbti;
      const like = item.like;
      const comment = item.comment;

      const newData: CommentData = new CommentData();
      newData.host_id = paramUserId;
      newData.mbti = mbti;
      newData.like = like;
      //댓글이 존재하는지 확인
      if (comment !== undefined && comment !== null && comment !== '') {
        newData.comment = comment;
        await this.commentRepository.save(newData);
      }
      //좋아요 수 증가
      await this.mbtiService.updateLikes(newData.host_id, newData.mbti, like);
    }
    return new StandardResponseDto(
      201,
      'api.common.created',
      'Done Like Update',
    );
  }
  async findComments(
    paramUserId: number,
    paramMbti: string,
    publicKey: string,
    page: number,
    size: number,
  ): Promise<any> {
    const user = await this.usersService.findOne({
      select: ['public_key'],
      where: { _id: paramUserId },
    });

    if (user.public_key !== publicKey) {
      throw new BadRequestException('public_key not found');
    }
    const [comments, total] = await this.commentRepository.findAndCount({
      where: { host_id: paramUserId, mbti: paramMbti },
      take: size,
      skip: (page - 1) * size,
    });

    const commentsData = {
      total,
      comments,
    };

    return commentsData;
  }
}
