import { Injectable, Inject } from '@nestjs/common';
import { Mbti } from './mbti.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MbtiService {
  constructor(
    @Inject('MBTI_REPOSITORY')
    private mbtiRepository: Repository<Mbti>,
  ) {}

  async createMbti(paramUserId: number, bodyData: any): Promise<Mbti> {
    // 새로운 MBTI 데이터 생성
    const newData: Mbti = new Mbti();
    newData.user_id = paramUserId;
    newData.ei = bodyData.ei;
    newData.ns = bodyData.ns;
    newData.tf = bodyData.tf;
    newData.pj = bodyData.pj;

    return this.mbtiRepository.save(newData);
  }
  async findOne(options: any): Promise<Mbti | undefined> {
    const mbti = await this.mbtiRepository.findOne(options);
    return mbti || undefined;
  }
  async updateMbti(paramUserId: number, bodyData: any): Promise<Mbti> {
    const newData = await this.mbtiRepository.update(
      { user_id: paramUserId },
      { ei: bodyData.ei, ns: bodyData.ns, tf: bodyData.tf, pj: bodyData.pj },
    );
    return newData.raw[0];
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
    }
  }
}
