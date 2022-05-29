import * as os from 'os';
import * as path from 'path';
import { JsonHelper } from '$cli/util';
import { CliLoggerService } from './CliLoggerService';

export class GlobalConfigService {
  private readonly CONFIG_FILE_PATH = path.join(os.homedir(), '.tssrc');
  private config: Configurations = {
    noOfLocalBackups: 1,
    preferredEditor: 'code',
  };

  constructor(private readonly logger: CliLoggerService = new CliLoggerService()) {
    this.config = JsonHelper.importJsonSync(this.CONFIG_FILE_PATH, true) as Configurations;
  }

  get(key: keyof Configurations) {
    return this.config[key];
  }

  set(key: keyof Configurations, value: string | number) {
    this.config[key] = value;
    this.logger.debug(`Attempting to write to ${this.CONFIG_FILE_PATH}`);
    return JsonHelper.writeJson(this.CONFIG_FILE_PATH, this.config);
  }

  getAccessToken() {
    return this.get('token');
  }

  setAccessToken(token: string) {
    return this.set('token', token);
  }
}

export interface Configurations extends Record<string, unknown> {
  token?: string;
  noOfLocalBackups: number;
  preferredEditor: string;
}
