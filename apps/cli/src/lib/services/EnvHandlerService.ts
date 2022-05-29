import * as fs from 'fs';
import * as path from 'path';
import { FileNotFoundError } from '$cli/errors';
import { FileHelper } from '$cli/util';

export class EnvHandlerService {
  private readonly envFilePath: string;
  constructor(private readonly envFileExtension = '') {
    if (envFileExtension.length !== 0) envFileExtension = `.${envFileExtension}`;
    this.envFilePath = path.resolve(process.cwd(), `.env${this.envFileExtension}`);

    if (!fs.existsSync(this.envFilePath)) {
      throw new FileNotFoundError(this.envFilePath);
    }
  }

  async exposeEnvAsObject() {
    return FileHelper.parseJsonFromEqualsRepresentationFile(this.envFilePath);
  }

  async exportEnvFromObject(envAsObject: Record<string, string>) {
    const content = Object.entries(envAsObject)
      .map(([key, value]) => `${key} = ${value}`)
      .join('\n');
    FileHelper.writeToFile(this.envFilePath, content);
  }
}
