import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { StandardResponseDto } from 'src/dto/standard-response.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/public_key')
  async findPublickey(@Param('userId') paramUserId: number): Promise<any> {
    const user = await this.usersService.findOne({
      where: { _id: paramUserId },
    });

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const result = user.public_key;

    return new StandardResponseDto(200, 'api.common.ok', result);
  }
}
