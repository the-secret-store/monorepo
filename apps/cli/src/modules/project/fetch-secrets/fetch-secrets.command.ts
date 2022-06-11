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

@Command({
  name: 'fetch',
  options: { isDefault: false },
  description: 'Fetch secrets from the secret store and update local copy',
})
export class FetchSecrets implements CommandRunner {
  private logger: CliLoggerService;

  constructor(
    private readonly api: ApiService,
    private readonly projectConfig: ProjectConfigService,
    private readonly envHandler: EnvHandlerService
  ) {
    this.logger = new CliLoggerService(FetchSecrets.name);
  }

  async run(): Promise<void> {
    const projectId = this.projectConfig.getProjectId();

    if (!projectId) throw new ClientError('Not a Secret Store project');

    try {
      const { secrets, lastUpdatedBy, updatedAt } = (await (
        await this.api.get(Requests.projects.GET_PROJECT_SECRETS(projectId))
      ).data) as IProject;
      await this.envHandler.exportEnvFromObject(secrets);

      this.logger.info(`Updated by ${lastUpdatedBy} on ${updatedAt}`); // todo: use timeago
    } catch (error) {
      if (error.isAxiosError) throw error; // handled globally
    }
  }
}
