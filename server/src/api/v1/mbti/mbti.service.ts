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
}
