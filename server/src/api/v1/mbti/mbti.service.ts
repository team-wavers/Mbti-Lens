import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Mbti } from './mbti.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

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
      throw new NotFoundException('mbti data not found');
    }
    newData.ei = bodyData.ei;
    newData.ns = bodyData.ns;
    newData.tf = bodyData.tf;
    newData.pj = bodyData.pj;

    const public_key = await this.usersService.findOne({
      where: { _id: paramUserId },
    }); // 유저 검색 실패시 에러 처리
    if (!public_key) {
      throw new NotFoundException('user data not found');
    }
    await this.mbtiRepository.save(newData);
    return public_key?.public_key;
  }
  async findOne(options: any): Promise<Mbti | null> {
    const mbti = await this.mbtiRepository.findOne(options);
    return mbti;
  }
  async updateLikes(
    user_id: number,
    mbti: string,
    count: number,
  ): Promise<Mbti | undefined> {
    let updateField = '';
    if (mbti === 'e' || mbti === 'i') {
      updateField = 'ei_like';
    } else if (mbti === 'n' || mbti === 's') {
      updateField = 'ns_like';
    } else if (mbti === 't' || mbti === 'f') {
      updateField = 'tf_like';
    } else if (mbti === 'p' || mbti === 'j') {
      updateField = 'pj_like';
    }

    if (updateField) {
      const updateData = await this.mbtiRepository.update(
        { user_id: user_id },
        { [updateField]: count },
      );
      return updateData.raw[0];
    } else {
      throw new NotFoundException('mbti data is not correct');
    }
  }
}
