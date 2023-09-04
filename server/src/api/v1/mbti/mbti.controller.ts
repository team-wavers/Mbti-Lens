import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { MbtiService } from './mbti.service';
import { StandardResponseDto } from '../../../dto/standard-response.dto';

@Controller('v1/users')
export class MbtiController {
  constructor(private readonly mbtiService: MbtiService) {}

  @Post(':userId/mbtis')
  async createMbti(
    @Param('userId') paramUserId: number,
    @Body() bodyData: any,
  ): Promise<any> {
    // 사용자 정보 검색
    const mbtiTableCheck = await this.mbtiService.findOne({
      where: { user_id: paramUserId },
    });
    // MBTI 정보가 없으면 생성, 있으면 업데이트
    if (!mbtiTableCheck) {
      await this.mbtiService.createMbti(paramUserId, bodyData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'api.common.created',
      };
    } else {
      await this.mbtiService.updateMbti(paramUserId, bodyData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'api.common.created',
      };
    }
  }

  @Get(':userId/mbtis')
  async showMbtis(@Param('userId') paramUserId: number): Promise<any> {
    const result = await this.mbtiService.findOne({
      where: { user_id: paramUserId },
    });
    return new StandardResponseDto(200, 'api.common.ok', result);
  }
}
