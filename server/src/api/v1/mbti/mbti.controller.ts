import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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
    // MBTI 정보가 없으면 생성, 있다면 에러 처리
    if (!mbtiTableCheck) {
      const public_key = await this.mbtiService.createMbti(
        paramUserId,
        bodyData,
      );
      return new StandardResponseDto(201, 'api.common.created', public_key);
    } else {
      return new StandardResponseDto(400, 'Bad Request', 'data already exists');
    }
  }

  @Get(':userId/mbtis')
  async showMbtis(@Param('userId') paramUserId: number): Promise<any> {
    const result = await this.mbtiService.findOne({
      where: { user_id: paramUserId },
    });
    const resultNickName = await this.mbtiService.findUser({
      where: { _id: paramUserId },
    });
    if (!result || !resultNickName) {
      throw new BadRequestException('mbti data not found');
    }
    const resultWithNickname = {
      ...result,
      nickname: resultNickName,
    };
    return new StandardResponseDto(200, 'api.common.ok', resultWithNickname);
  }
}
