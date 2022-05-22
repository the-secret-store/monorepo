import { BrowserService, CliLoggerService } from '../../../lib/util';
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';

@Command({
  name: 'login',
  options: { isDefault: true },
})
export class Login implements CommandRunner {
  private readonly loggerService = new CliLoggerService('Login');
  constructor(private browserService: BrowserService, private readonly inquirer: InquirerService) {}

  async run(_inputs: string[], options: Record<string, string>): Promise<void> {
    let { token } = options;

    if (!token) {
      this.loggerService.info('Generate a new auth token and paste it here');
      this.browserService.open('user/settings');
      token = (await this.inquirer.ask<{ token: string }>('token', undefined)).token;
    }

    this.loggerService.debug(token, 'Received');
  }

  @Option({
    flags: '-t, --token <token>',
    description: 'Json Web Token obtained from the web client',
  })
  parseShell(val: string) {
    return val;
  }
}
