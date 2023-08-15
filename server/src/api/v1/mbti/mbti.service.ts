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
}
