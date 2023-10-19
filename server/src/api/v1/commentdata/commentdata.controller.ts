import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentdataService } from './commentdata.service';
import { StandardResponseDto } from 'src/dto/standard-response.dto';

@Controller('v1/users')
export class CommentdataController {
  constructor(private readonly commentdataService: CommentdataService) {}

  @Post(':userId/mbtis/comments')
  async createComment(
    @Param('userId') paramUserId: number,
    @Body() bodyData: any,
    @Query('public_key') public_key: string,
  ): Promise<any> {
    return await this.commentdataService.createNewData(
      paramUserId,
      bodyData,
      public_key,
    );
  }

  @Get(':userId/mbtis/:mbti/comments')
  async showComments(
    @Param('userId') paramUserId: number,
    @Param('mbti') paramMbti: string,
    @Query('public_key') public_key: string,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ): Promise<any> {
    return new StandardResponseDto(
      200,
      'api.common.ok',
      await this.commentdataService.findComments(
        paramUserId,
        paramMbti,
        public_key,
        page,
        size,
      ),
    );
  }
}
