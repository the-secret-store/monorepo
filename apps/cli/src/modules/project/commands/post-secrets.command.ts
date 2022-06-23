import { Command, CommandRunner } from 'nest-commander';
import { Requests } from '@the-secret-store/api-interfaces/constants';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import {
  ApiService,
  CliLoggerService,
  EnvHandlerService,
  ProjectConfigService,
} from '$cli/services';
import { ClientError } from '$cli/errors';
import { JsonHelper } from '$cli/util';

@Command({
  name: 'post',
  options: { isDefault: false },
  description: 'Update the central copy with the local copy',
})
export class PostSecrets implements CommandRunner {
  private logger: CliLoggerService;

  constructor(
    private readonly api: ApiService,
    private readonly projectConfig: ProjectConfigService,
    private readonly envHandler: EnvHandlerService
  ) {
    this.logger = new CliLoggerService(PostSecrets.name);
  }

  async run(): Promise<void> {
    const projectId = this.projectConfig.getProjectId();

    if (!projectId) throw new ClientError('Not a Secret Store project');

    try {
      const secrets = await this.envHandler.exposeEnvAsObject();
      const response = await this.api.patch(
        Requests.projects.POST_PROJECT_SECRETS(projectId),
        secrets
      );

      this.logger.info(JsonHelper.prettyJson((response.data.result as IProject).secrets));
      this.logger.success(`Secrets updated successfully`);
    } catch (error) {
      if (error.isAxiosError) throw error; // handled globally
    }
  }
}
