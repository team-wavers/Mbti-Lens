import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MbtiService } from './mbti.service';
import { Mbti } from './mbti.entity';

@Controller('v1/users')
export class MbtiController {
  constructor(private readonly mbtiService: MbtiService) {}

  @Get()
  async findAll(): Promise<Mbti[]> {
    return this.mbtiService.findAll();
  }

  @Post(':userId/mbtis')
  async createMbti(
    //생성시 파라미터 불필요
    //@Param('userId') userId: string,
    @Body() mbtiData: Mbti,
  ): Promise<Mbti> {
    return this.mbtiService.createMbti(mbtiData);
  }
}
