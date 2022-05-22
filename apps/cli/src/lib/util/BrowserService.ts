import * as openInBrowser from 'open';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BrowserService {
  private baseUrl = 'http://localhost:4200';

  open(route: string) {
    if (!route.startsWith('/')) route = `/${route}`;
    console.debug('Attempting to', `${this.baseUrl}${route}`, 'on browser');
    openInBrowser(`${this.baseUrl}${route}`);
  }
}
