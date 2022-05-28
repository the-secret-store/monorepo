import * as pc from 'picocolors';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CliLoggerService {
  constructor(private globalContext?: string) {}

  private addContextIfPresent(message: string, context?: string) {
    return `${context ?? this.globalContext ?? 'The Secret Store CLI'}: ${message}`;
  }

  debug(message: string, context?: string) {
    if (process.env.NODE_ENV === 'production') return;
    console.debug(pc.gray(this.addContextIfPresent(message, context)));
  }

  info(message: string, context?: string) {
    console.info(pc.cyan(this.addContextIfPresent(message, context)));
  }

  warn(message: string, context?: string) {
    console.warn(pc.yellow(this.addContextIfPresent(message, context)));
  }

  error(message: string, context?: string) {
    console.error(pc.red(this.addContextIfPresent(message, context)));
  }
}
