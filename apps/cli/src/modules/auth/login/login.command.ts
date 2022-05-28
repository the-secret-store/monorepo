import { BrowserService, CliLoggerService, GlobalConfigService } from '../../../lib/util';
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';

@Command({
  name: 'login',
  options: { isDefault: false },
  description: 'login to your account',
})
export class Login implements CommandRunner {
  private readonly loggerService = new CliLoggerService('Login');
  constructor(
    private browserService: BrowserService,
    private readonly inquirer: InquirerService,
    private readonly globalConfigService: GlobalConfigService
  ) {}

  async run(_inputs: string[], options: Record<string, string>): Promise<void> {
    let { token } = options;

    if (!token) {
      this.loggerService.info('Generate a new auth token and paste it here');
      this.browserService.open('user/settings');
      token = (await this.inquirer.ask<{ token: string }>('token', undefined)).token;
    }

    this.loggerService.debug(token, 'Received');
    await this.globalConfigService.setAccessToken(token);
  }

  @Option({
    flags: '-t, --token <token>',
    description: 'Json Web Token obtained from the web client',
  })
  parseShell(val: string) {
    return val;
  }
}
