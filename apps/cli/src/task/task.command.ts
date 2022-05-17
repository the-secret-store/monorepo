import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'run',
  options: { isDefault: true },
})
export class TaskRunner implements CommandRunner {
  async run(): Promise<void> {
    console.log('Hello World');
  }
}
