import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    paramMbti: string,
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
    const newData: CommentData = new CommentData();
    newData.host_id = paramUserId;
    newData.mbti = paramMbti;
    newData.like = bodyData.like;
    if (bodyData.like === undefined || null) {
      throw new BadRequestException(' like data not found');
    }
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
    await this.commentRepository.save(newData);
    const count = await this.countLikes({
      where: {
        host_id: newData.host_id,
        mbti: newData.mbti,
        like: newData.like,
      },
    });
    const islike = newData.like;
    await this.mbtiService.updateLikes(
      newData.host_id,
      newData.mbti,
      count,
      islike,
    );
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
