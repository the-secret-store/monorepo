import * as path from 'path';
import { Injectable } from '@nestjs/common';

import { Helpers } from './Helpers';

@Injectable()
export class ProjectConfigService {
  private readonly packageJsonFile = path.resolve(process.cwd(), 'package.json');
  private readonly packageJson: Record<string, unknown>;

  constructor() {
    this.packageJson = Helpers.importFile(this.packageJsonFile) as Record<string, unknown>;
  }

  getConfig(key: string) {
    return this.packageJson[key];
  }

  setConfig(key: string, value: unknown) {
    this.packageJson[key] = value;
    Helpers.writeJson(this.packageJsonFile, this.packageJson);
  }
}
