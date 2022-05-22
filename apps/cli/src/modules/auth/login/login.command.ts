import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'login',
  options: { isDefault: false },
})
export class Login implements CommandRunner {
  async run(): Promise<void> {
    console.log('Executing login');
  }
}
