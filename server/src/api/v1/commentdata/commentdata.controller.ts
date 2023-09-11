import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CommentdataService } from './commentdata.service';
import { StandardResponseDto } from 'src/dto/standard-response.dto';

@Controller('v1/users')
export class CommentdataController {
  constructor(private readonly commentdataService: CommentdataService) {}

  @Post(':userId/mbtis/:mbti/comments')
  async createComment(
    @Param('userId') paramUserId: number,
    @Param('mbti') paramMbti: string,
    @Body() bodyData: any,
  ): Promise<any> {
    const newData = await this.commentdataService.createNewData(
      paramUserId,
      paramMbti,
      bodyData,
    );
    return await this.commentdataService.createComment(newData);
  }

  @Get(':userId/mbtis/:mbti/comments')
  async showComments(
    @Param('userId') paramUserId: number,
    @Param('mbti') paramMbti: string,
  ): Promise<any> {
    return new StandardResponseDto(
      200,
      'api.common.ok',
      await this.commentdataService.findComments(paramUserId, paramMbti),
    );
  }
}
