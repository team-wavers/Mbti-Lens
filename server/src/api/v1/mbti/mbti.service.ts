import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Mbti } from './mbti.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { StandardResponseDto } from 'src/dto/standard-response.dto';

@Injectable()
export class MbtiService {
  constructor(
    @Inject('MBTI_REPOSITORY')
    private mbtiRepository: Repository<Mbti>,
    private usersService: UsersService,
  ) {}

  async createMbti(paramUserId: number, bodyData: any): Promise<any> {
    // 새로운 MBTI 데이터 생성
    const newData: Mbti = new Mbti();
    newData.user_id = paramUserId;
    if (
      bodyData.ei === '' ||
      bodyData.ns === '' ||
      bodyData.tf === '' ||
      bodyData.pj === '' ||
      bodyData.ei === undefined ||
      bodyData.ns === undefined ||
      bodyData.tf === undefined ||
      bodyData.pj === undefined
    ) {
      throw new BadRequestException('mbti data not found');
    }
    newData.ei = bodyData.ei;
    newData.ns = bodyData.ns;
    newData.tf = bodyData.tf;
    newData.pj = bodyData.pj;

    const public_key = await this.usersService.findOne({
      where: { _id: paramUserId },
    }); // 유저 검색 실패시 에러 처리
    if (!public_key) {
      throw new BadRequestException('user data not found');
    }
    await this.mbtiRepository.save(newData);
    return public_key?.public_key;
  }
  async findOne(options: any): Promise<Mbti | null> {
    const mbti = await this.mbtiRepository.findOne(options);
    return mbti;
  }
  async findUser(options: any): Promise<any> {
    const userdata = await this.usersService.findOne(options);
    return userdata?.nickname;
  }
  async updateLikes(
    user_id: number,
    mbti: string,
    islike: boolean,
  ): Promise<any> {
    let updateField = '';
    if (islike) {
      updateField = '_like';
    } else {
      updateField = '_dislike';
    }
    if (mbti === 'e' || mbti === 'i') {
      updateField = 'ei' + updateField;
    } else if (mbti === 'n' || mbti === 's') {
      updateField = 'ns' + updateField;
    } else if (mbti === 't' || mbti === 'f') {
      updateField = 'tf' + updateField;
    } else if (mbti === 'p' || mbti === 'j') {
      updateField = 'pj' + updateField;
    }
    if (updateField) {
      await this.mbtiRepository.increment({ user_id: user_id }, updateField, 1);
      return new StandardResponseDto(
        201,
        'api.common.created',
        'Done Like Update',
      );
    } else {
      throw new BadRequestException('mbti data is not correct');
    }
  }
}
