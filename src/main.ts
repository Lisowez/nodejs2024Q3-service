import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { LoggingService } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/logger.filter';
config();
const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = new LoggingService();
  app.useGlobalFilters(new HttpExceptionFilter());
  process.on('uncaughtException', (error) => {
    loggingService.error(`Uncaught Exception: ${error.message}`);
    // Выход из процесса (по желанию, чтобы сделать перезапуск)
  });

  // Глобальная обработка необработанных обещаний
  process.on('unhandledRejection', (reason) => {
    loggingService.error(`Unhandled Rejection: ${reason}`);
  });

  // Примените middleware для обработки ошибок
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(PORT);
}
bootstrap();
