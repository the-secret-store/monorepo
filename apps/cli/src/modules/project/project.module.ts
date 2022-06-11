import { Module } from '@nestjs/common';
import {
  ApiService,
  EnvHandlerService,
  GlobalConfigService,
  ProjectConfigService,
} from '$cli/services';
import { FetchSecrets } from './fetch-secrets/fetch-secrets.command';

@Module({
  imports: [],
  providers: [
    ApiService,
    ProjectConfigService,
    EnvHandlerService,
    GlobalConfigService,
    FetchSecrets,
  ],
  exports: [],
})
export class ProjectModule {}
