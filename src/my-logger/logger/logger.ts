import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class Logger implements LoggerService {
  private formatMessage(message: string, context?: string): string {
    const now = new Date();
    return `[${now.toISOString()}] [${context || 'App'}]: ${message}`;
  }

  log(message: string, context?: string) {
    console.log(this.formatMessage(message, context));
  }

  error(message: string, trace: string, context?: string) {
    console.error(this.formatMessage(message, context), trace);
  }

  warn(message: string, context?: string) {
    console.warn(this.formatMessage(message, context));
  }

  debug(message: string, context?: string) {
    console.debug(this.formatMessage(message, context));
  }
}
