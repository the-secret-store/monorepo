import ora, { Ora } from 'ora';
import * as pc from 'picocolors';

export class Spinner {
  private spinner: Ora;

  constructor(message: string) {
    this.spinner = ora(message);
  }

  start() {
    this.spinner.start();
  }

  succeed(message: string) {
    this.spinner.succeed(pc.green(message));
  }

  fail(message: string) {
    this.spinner.fail(pc.red(message));
  }
}
