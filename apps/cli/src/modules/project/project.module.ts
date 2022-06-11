import { Module } from '@nestjs/common';
import {
  ApiService,
  EnvHandlerService,
  GlobalConfigService,
  ProjectConfigService,
} from '$cli/services';
import { FetchSecrets, PostSecrets } from './commands';

@Module({
  imports: [],
  providers: [
    ApiService,
    ProjectConfigService,
    EnvHandlerService,
    GlobalConfigService,
    FetchSecrets,
    PostSecrets,
  ],
  exports: [],
})
export class ProjectModule {}
