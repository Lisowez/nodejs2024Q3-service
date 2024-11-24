import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private loggingService: LoggingService) {}

  use(req: any, res: any, next: () => void) {
    this.loggingService.logRequest(req);

    // Перехват отправки ответа
    const oldSend = res.send.bind(res);
    res.send = (body: any) => {
      this.loggingService.logResponse(res);
      return oldSend(body);
    };

    next();
  }
}
