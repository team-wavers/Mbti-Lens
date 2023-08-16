import { Injectable, Inject } from '@nestjs/common';
import { Mbti } from './mbti.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MbtiService {
  constructor(
    @Inject('MBTI_REPOSITORY')
    private mbtiRepository: Repository<Mbti>,
  ) {}
  async findAll(): Promise<Mbti[]> {
    return this.mbtiRepository.find({ relations: ['user'] });
  }
  async createMbti(mbtiData: Mbti): Promise<Mbti> {
    return this.mbtiRepository.save(mbtiData);
  }
  async findOne(options: any): Promise<Mbti | undefined> {
    const mbti = await this.mbtiRepository.findOne(options);
    return mbti || undefined;
  }
  async updateMbti(mbtiData: Mbti): Promise<Mbti> {
    await this.mbtiRepository.update(
      { userId: mbtiData.userId },
      { mbti: mbtiData.mbti },
    );
    return mbtiData;
  }
  async createComment(
    mbtiTable: Mbti,
    paramMbti: string,
    bodyData: any,
  ): Promise<any> {
    //mbti속성에 따라 다른 컬럼에 저장(인덱스에서 홀수는 상태 짝수는 코멘트)
    if (paramMbti === 'E' || paramMbti === 'I') {
      if (!mbtiTable.EI) mbtiTable.EI = []; // EI가 null이면 초기화
      mbtiTable.EI.push(bodyData.status);
      mbtiTable.EI.push(bodyData.comment);
    } else if (paramMbti === 'N' || paramMbti === 'S') {
      if (!mbtiTable.NS) mbtiTable.NS = []; // NS가 null이면 초기화
      mbtiTable.NS.push(bodyData.status);
      mbtiTable.NS.push(bodyData.comment);
    } else if (paramMbti === 'T' || paramMbti === 'F') {
      if (!mbtiTable.TF) mbtiTable.TF = []; // TF가 null이면 초기화
      mbtiTable.TF.push(bodyData.status);
      mbtiTable.TF.push(bodyData.comment);
    } else if (paramMbti === 'P' || paramMbti === 'J') {
      if (!mbtiTable.PJ) mbtiTable.PJ = []; // PJ가 null이면 초기화
      mbtiTable.PJ.push(bodyData.status);
      mbtiTable.PJ.push(bodyData.comment);
    }
    console.log(mbtiTable);
    await this.mbtiRepository.save(mbtiTable);
  }
}
