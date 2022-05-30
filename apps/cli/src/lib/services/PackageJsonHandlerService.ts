import { Injectable } from '@nestjs/common';
import path = require('path');
import { JsonHelper } from '../util/JsonHelper';

@Injectable()
export class PackageJsonHandlerService {
  private packageJson: MinimalPackageJson;

  constructor() {
    this.packageJson = JsonHelper.importJsonSync(
      path.resolve(process.cwd(), 'package.json')
    ) as MinimalPackageJson;
  }

  getProjectId() {
    return this.packageJson['the-secret-store'].projectId;
  }

  getGitUrl() {
    return this.packageJson.repository.url;
  }

  getProjectName() {
    return this.packageJson.name;
  }
}

interface MinimalPackageJson extends Record<string, string | object> {
  name: string;

  author?: {
    email?: string;
    name?: string;
    url?: string;
  };

  repository?: {
    directory?: string;
    type?: string;
    url?: string;
  };

  'the-secret-store': {
    projectId: string;
  };
}
