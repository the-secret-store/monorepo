import { randomBytes } from 'crypto';

export function generateHexString(size: number): string {
  return randomBytes(size).toString('hex');
}
