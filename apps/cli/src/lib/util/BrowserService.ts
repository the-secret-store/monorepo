import * as openInBrowser from 'open';
import { Injectable } from '@nestjs/common';
import { CliLoggerService } from './CliLoggerService';

@Injectable()
export class BrowserService {
  private baseUrl = 'http://localhost:4200';
  private loggerService = new CliLoggerService(BrowserService.name);

  open(route: string) {
    if (!route.startsWith('/')) route = `/${route}`;
    this.loggerService.debug(`Attempting to ${this.baseUrl}${route} on browser`);
    openInBrowser(`${this.baseUrl}${route}`);
  }
}
