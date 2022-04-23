import { randomBytes } from 'crypto';

export function generateHexString(size: number): string {
  let str: string;
  randomBytes(size, (_err, buffer) => {
    str = buffer.toString('hex');
  });
  return str;
}
