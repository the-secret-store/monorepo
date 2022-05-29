import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';
import { Requests } from '@the-secret-store/api-interfaces/constants';
import { ApiService, BrowserService, CliLoggerService, GlobalConfigService } from '$cli/services';

@Command({
  name: 'login',
  options: { isDefault: false },
  description: 'login to your account',
})
export class Login implements CommandRunner {
  private readonly loggerService = new CliLoggerService('AuthService');
  constructor(
    private browserService: BrowserService,
    private readonly inquirer: InquirerService,
    private readonly api: ApiService,
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

    try {
      await this.api.get(Requests.auth.VALIDATE_TOKEN, { data: { token } });
      await this.globalConfigService.setAccessToken(token);
      this.loggerService.success('Login successful');
    } catch (error) {
      this.loggerService.error('Invalid token, please obtain a new token and paste it here');
    }
  }

  @Option({
    flags: '-t, --token <token>',
    description: 'Json Web Token obtained from the web client',
  })
  parseShell(val: string) {
    return val;
  }
}
