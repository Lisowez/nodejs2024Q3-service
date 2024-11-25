import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private logger = new Logger(LoggingService.name);
  private logLevel: string;
  private logFilePath: string;

  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'error';
    this.logFilePath = path.join(__dirname, './app.log');

    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    process.on('uncaughtException', (err) =>
      this.logError(`Unhandled Exception: ${err.message}`),
    );
    process.on('unhandledRejection', (reason) =>
      this.logError(`Unhandled Rejection: ${reason}`),
    );
  }

  error(message: string) {
    if (this.shouldLog('error')) {
      this.logError(message);
    }
  }

  private logError(message: string) {
    const logMessage = `ERROR: ${message}`;
    this.logger.error(logMessage);
    this.writeLogToFile(logMessage);
  }

  private shouldLog(level: string): boolean {
    const levels = ['error'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private writeLogToFile(message: string) {
    const formattedMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(this.logFilePath, formattedMessage, { encoding: 'utf8' });
    this.rotateLogs();
  }

  logRequest(request: any) {
    const logMessage = `Request: ${request.method} ${
      request.url
    } Query: ${JSON.stringify(request.query)} Body: ${JSON.stringify(
      request.body,
    )}`;
    this.logger.log(logMessage);
    this.writeLogToFile(logMessage);
  }

  // Метод для логирования ответов
  logResponse(response: any) {
    const logMessage = `Response: ${response.statusCode}`;
    this.logger.log(logMessage);
    this.writeLogToFile(logMessage);
  }

  private rotateLogs() {
    const stats = fs.statSync(this.logFilePath);
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    if (stats.size >= maxFileSize) {
      const date = new Date().toISOString().split('T')[0];
      const backupFilePath = this.logFilePath.replace('.log', `-${date}.log`);
      fs.renameSync(this.logFilePath, backupFilePath);
      fs.writeFileSync(this.logFilePath, '', { encoding: 'utf8' }); // Создаем новый пустой файл
    }
  }
}
