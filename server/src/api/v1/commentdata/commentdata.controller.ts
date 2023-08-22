import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentdataService } from './commentdata.service';

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
    return await this.commentdataService.findComments(paramUserId, paramMbti);
  }
}
