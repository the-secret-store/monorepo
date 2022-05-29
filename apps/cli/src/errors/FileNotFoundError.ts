export class FileNotFoundError extends Error {
  constructor(file: string) {
    super(
      `File not found: ${file}. Check if you're running the command from root of your project.`
    );
    this.name = 'FileNotFoundError';
  }
}
