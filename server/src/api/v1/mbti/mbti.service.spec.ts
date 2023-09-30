import { Test, TestingModule } from '@nestjs/testing';
import { MbtiService } from './mbti.service';
import { MbtiController } from './mbti.controller';
import { Repository } from 'typeorm';

describe('MbtiService', () => {
  let service: MbtiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MbtiService,
        {
          provide: 'MBTI_REPOSITORY',
          useClass: Repository,
        },
      ],
      controllers: [MbtiController],
    }).compile();

    service = module.get<MbtiService>(MbtiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
