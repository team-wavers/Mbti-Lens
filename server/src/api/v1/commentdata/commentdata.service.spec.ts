import { Test, TestingModule } from '@nestjs/testing';
import { CommentdataService } from './commentdata.service';

describe('CommentdataService', () => {
  let service: CommentdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentdataService],
    }).compile();

    service = module.get<CommentdataService>(CommentdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
