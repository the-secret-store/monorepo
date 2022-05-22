import * as openInBrowser from 'open';

export class BrowserService {
  private baseUrl: 'http://localhost:4200';

  open(route: string) {
    if (!route.startsWith('/')) route = `/${route}`;
    openInBrowser(`${this.baseUrl}${route}`);
  }
}
