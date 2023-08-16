import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { MbtiService } from './mbti.service';
import { UsersService } from '../users/users.service';
import { Mbti } from './mbti.entity';

@Controller('v1/users')
export class MbtiController {
  constructor(
    private readonly mbtiService: MbtiService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(): Promise<Mbti[]> {
    return this.mbtiService.findAll();
  }

  @Post(':userId/mbtis')
  async createMbti(
    @Param('userId') paramUserId: number,
    @Body() bodyData: any,
  ): Promise<Mbti> {
    // 사용자 정보 검색
    const mbtiTableCheck = await this.mbtiService.findOne({
      where: { userId: paramUserId },
    });
    // 새로운 MBTI 데이터 생성
    const newData: Mbti = new Mbti();
    newData.userId = paramUserId;
    newData.mbti = bodyData.mbti;
    // MBTI 정보가 없으면 생성, 있으면 업데이트
    if (!mbtiTableCheck) {
      return await this.mbtiService.createMbti(newData);
    } else {
      return await this.mbtiService.updateMbti(newData);
    }
  }
  @Post(':userId/mbtis/:mbti/comments')
  async createComment(
    @Param('userId') paramUserId: number,
    @Param('mbti') paramMbti: string,
    @Body() bodyData: string[],
  ): Promise<any> {
    const mbtiTable = await this.mbtiService.findOne({
      where: { userId: paramUserId },
    });
    //mbtiTable undefined check
    if (!mbtiTable) {
      throw new NotFoundException('mbtiTable not found');
    }
    return await this.mbtiService.createComment(mbtiTable, paramMbti, bodyData);
  }
}
