import * as path from 'path';
import { JsonHelper } from '$cli/util';
import { CliLoggerService } from './CliLoggerService';

export class ProjectConfigService {
  private readonly CONFIG_FILE_PATH = path.join(process.cwd(), '.tssrc');
  config: ProjectConfig;

  private loadConfiguration(config: ProjectConfig | Record<string, unknown>) {
    this.config = config as ProjectConfig;
  }

  constructor(private readonly logger: CliLoggerService = new CliLoggerService()) {
    this.config = JsonHelper.readJson(this.CONFIG_FILE_PATH, true) as unknown as ProjectConfig;
  }

  private getConfig(key: keyof ProjectConfig) {
    return this.config[key];
  }

  private setConfig(key: keyof ProjectConfig, value: string) {
    this.config[key] = value;
    this.logger.debug(`Attempting to write to ${this.CONFIG_FILE_PATH}`);
    return JsonHelper.writeJson(
      this.CONFIG_FILE_PATH,
      this.config as unknown as Record<string, string>
    );
  }

  getProjectId() {
    return this.getConfig('id');
  }
}

export interface ProjectConfig {
  id: string;
}
