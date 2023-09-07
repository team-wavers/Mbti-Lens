import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const logLevel = statusCode >= 400 ? 'error' : 'log';

      this.logger[logLevel](
        `Request from ${ip} to ${method} ${originalUrl} - ${statusCode} ${statusMessage} - ${userAgent}`,
      );
    });

    next();
  }
}
