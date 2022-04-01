import { UseGuards } from '@nestjs/common';
import { AuthTokenGuard } from '../token/token.guard';

export function Protect() {
  return UseGuards(AuthTokenGuard);
}
