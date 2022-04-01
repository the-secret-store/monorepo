import { LoggerService, LogLevel } from '@nestjs/common';
import * as pc from 'picocolors';
import { prettyPrint } from '../utils';

type LogMsg = string | Record<string, unknown> | Array<unknown> | object | Error;

export class Scream implements LoggerService {
  allowedLevels = ['log', 'verbose', 'debug', 'warn', 'error'];

  constructor(protected readonly context?: string, allowedLevels?: LogLevel[]) {
    this.allowedLevels = allowedLevels;
  }

  private formatLevel(level: LogLevel) {
    switch (level) {
      case 'error':
        return pc.red(level);
      case 'warn':
        return pc.yellow(level);
      case 'debug':
        return pc.blue(level);
      case 'verbose':
        return pc.cyan(level);
      case 'log':
        return pc.green('info');
      default:
        return level;
    }
  }

  private formatLog(level: LogLevel, message: LogMsg, context?: string): string {
    const time = new Date();
    const timestamp = `${time.toLocaleDateString('en-GB')} ${time.toLocaleTimeString('en-US')}`;
    const contextFormatter = pc.dim(
      `${context ?? this.context ?? ''}${(context || this.context) && ': '}`
    );

    if (typeof message === 'object' && !(message instanceof Error)) {
      message = prettyPrint(message as Record<string, unknown>);
    }

    if (message instanceof Error) {
      message = message.stack;
    }

    return `[${timestamp}] ${this.formatLevel(level)} | ${contextFormatter}${message}`;
  }

  log(message: LogMsg, context?: string) {
    console.info(this.formatLog('log', message, context));
  }

  error(message: LogMsg, context?: string) {
    console.error(this.formatLog('error', message, context));
  }

  warn(message: LogMsg, context?: string) {
    console.warn(this.formatLog('warn', message, context));
  }

  debug?(message: LogMsg, context?: string) {
    console.debug(this.formatLog('debug', message, context));
  }

  verbose?(message: LogMsg, context?: string) {
    console.log(this.formatLog('verbose', message, context));
  }

  setLogLevels?(levels: LogLevel[]) {
    this.allowedLevels = levels;
  }
}
