import { CliLoggerService } from './CliLoggerService';

export function handleException(error: Error) {
  const logger = new CliLoggerService('Exception');
  console.warn('');
  if (error.message.includes('outputHelp'))
    return logger.warn('Please choose a valid command', 'Invalid command');
  logger.error(error.message);
}
