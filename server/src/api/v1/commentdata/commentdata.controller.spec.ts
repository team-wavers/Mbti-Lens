import { Test, TestingModule } from '@nestjs/testing';
import { CommentdataController } from './commentdata.controller';
import { CommentdataService } from './commentdata.service';

describe('CommentdataController', () => {
  let controller: CommentdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentdataController],
      providers: [CommentdataService],
    }).compile();

    controller = module.get<CommentdataController>(CommentdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
