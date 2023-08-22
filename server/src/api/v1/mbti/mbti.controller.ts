import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { MbtiService } from './mbti.service';

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
    try {
      const result = await this.mbtiService.findOne({
        where: { user_id: paramUserId },
      });
      if (!result) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Mbti not found for the given user ID',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'api.common.ok',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Mbti not found for the given user ID',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
