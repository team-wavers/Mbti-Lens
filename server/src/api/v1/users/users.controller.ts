import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { StandardResponseDto } from 'src/dto/standard-response.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/public_key')
  async findPublickey(@Param('userId') paramUserId: number): Promise<any> {
    const result = await this.usersService.findOne({
      select: ['public_key'],
      where: { _id: paramUserId },
    });

    if (!result) {
      throw new BadRequestException('user not found');
    }

    return new StandardResponseDto(200, 'api.common.ok', result);
  }
}
