import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { FileNotFoundError } from '../errors';

export class EnvFileHandlerService {
  private readonly envFilePath: string;

  constructor(ext = '') {
    this.envFilePath = path.resolve(process.cwd(), `.env${ext.length > 0 ? '.' : ''}${ext}`);
    if (!fs.existsSync(this.envFilePath)) fs.writeFileSync(this.envFilePath, '');
  }

  async exposeEnvAsJson(): Promise<EnvObjectType> {
    const data: EnvObjectType = {};

    if (!fs.existsSync(this.envFilePath)) {
      throw new FileNotFoundError(this.envFilePath);
    }

    const fileStream = fs.createReadStream(this.envFilePath);

    const lines = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of lines) {
      if (line.trim().length === 0) continue;

      const [key, value] = line.split('=').map(s => s.trim());
      data[key] = value;
    }

    fileStream.close();
    return data;
  }

  exportEnvFromObject(envAsObject: EnvObjectType) {
    const envFile = fs.createWriteStream(this.envFilePath);
    const content = Object.entries(envAsObject)
      .map(([key, value]) => `${key} = ${value}`)
      .join('\n');
    envFile.write(content);
    envFile.close();
  }
}

type EnvObjectType = Record<string, number | string>;
