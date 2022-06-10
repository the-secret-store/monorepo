import { Module } from '@nestjs/common';
import {
  ApiService,
  EnvHandlerService,
  GlobalConfigService,
  PackageJsonHandlerService,
} from '$cli/services';
import { FetchSecrets } from './fetch-secrets/fetch-secrets.command';

@Module({
  imports: [],
  providers: [
    ApiService,
    PackageJsonHandlerService,
    EnvHandlerService,
    GlobalConfigService,
    FetchSecrets,
  ],
  exports: [],
})
export class ProjectModule {}
