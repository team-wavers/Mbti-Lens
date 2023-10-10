import { Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { StandardResponseDto } from '../dto/standard-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // 예외 응답 형식으로 변환하여 반환
    const errorResponse = new StandardResponseDto(
      status,
      exception.message,
      null,
    );

    response.status(status).json(errorResponse);
  }
}
