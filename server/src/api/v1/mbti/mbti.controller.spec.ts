import { Test, TestingModule } from '@nestjs/testing';
import { MbtiController } from './mbti.controller';
import { MbtiService } from './mbti.service';
import { Repository } from 'typeorm';

describe('MbtiController', () => {
  let controller: MbtiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MbtiController],
      providers: [
        MbtiService,
        {
          provide: 'MBTI_REPOSITORY',
          useClass: Repository, // MBTI_REPOSITORY에 사용할 Repository 클래스
        },
      ],
    }).compile();

    controller = module.get<MbtiController>(MbtiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
