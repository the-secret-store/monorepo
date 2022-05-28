import * as path from 'path';
import * as os from 'os';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import { CliLoggerService } from '../../tools';
import { ConfigurationError } from '../errors';

export class GlobalConfigService {
  private readonly CONFIG_FILE_PATH = path.join(os.homedir(), '.tssrc');
  private config: Configurations = {
    noOfLocalBackups: 1,
    preferredEditor: 'code',
  };

  private async loadConfig() {
    try {
      const fileContent = await fsp.readFile(this.CONFIG_FILE_PATH, 'utf8');
      this.config = JSON.parse(fileContent);
    } catch (err) {
      throw new ConfigurationError(err);
    }
  }

  constructor(private readonly logger: CliLoggerService = new CliLoggerService()) {
    if (!fs.existsSync(this.CONFIG_FILE_PATH)) {
      logger.debug('Config file not found, creating an empty config file...');
      fs.writeFileSync(this.CONFIG_FILE_PATH, '{}');
    }
    this.loadConfig();
  }

  getConfig(key: keyof Configurations) {
    return this.config[key];
  }

  setConfig(key: keyof Configurations, value: string) {
    this.config[key as string] = value;
    this.logger.debug(`Attempting to write to ${this.CONFIG_FILE_PATH}`);
    return fsp.writeFile(this.CONFIG_FILE_PATH, JSON.stringify(this.config));
  }

  getAccessToken() {
    return this.getConfig('token');
  }

  setAccessToken(token: string) {
    return this.setConfig('token', token);
  }
}

export interface Configurations {
  token?: string;
  noOfLocalBackups: number;
  preferredEditor: string;
}
