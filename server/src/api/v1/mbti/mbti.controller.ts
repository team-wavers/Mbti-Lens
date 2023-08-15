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
    @Body() mbtiData: any,
  ): Promise<Mbti> {
    // 사용자 정보 검색
    const userId = await this.usersService.findOne({
      where: { _id: paramUserId },
      select: ['userid'],
    });
    // 사용자가 존재하지 않을 경우 예외 처리
    if (!userId) {
      throw new NotFoundException('userId not found');
    }
    // 사용자의 MBTI 정보 확인
    const mbtiTableCheck = await this.mbtiService.findOne({
      where: { userId: userId.userid },
    });
    // 새로운 MBTI 데이터 생성
    const newData: Mbti = new Mbti();
    newData.userId = userId.userid;
    newData.mbti = mbtiData.mbti;
    // MBTI 정보가 없으면 생성, 있으면 업데이트
    if (!mbtiTableCheck) {
      return await this.mbtiService.createMbti(newData);
    } else {
      return await this.mbtiService.updateMbti(newData);
    }
  }
}
