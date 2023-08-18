import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MbtiService } from './mbti.service';
import { Mbti } from './mbti.entity';

@Controller('v1/users')
export class MbtiController {
  constructor(private readonly mbtiService: MbtiService) {}

  @Post(':userId/mbtis')
  async createMbti(
    @Param('userId') paramUserId: number,
    @Body() bodyData: any,
  ): Promise<Mbti> {
    // 사용자 정보 검색
    const mbtiTableCheck = await this.mbtiService.findOne({
      where: { user_id: paramUserId },
    });
    // MBTI 정보가 없으면 생성, 있으면 업데이트
    if (!mbtiTableCheck) {
      return await this.mbtiService.createMbti(paramUserId, bodyData);
    } else {
      return await this.mbtiService.updateMbti(paramUserId, bodyData);
    }
  }

  @Get(':userId/mbtis')
  async showMbtis(
    @Param('userId') paramUserId: number,
  ): Promise<Mbti | undefined> {
    return await this.mbtiService.findOne({
      where: { user_id: paramUserId },
    });
  }
}
