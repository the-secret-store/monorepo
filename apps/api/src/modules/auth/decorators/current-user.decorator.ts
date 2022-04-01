import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '../token/token.strategy';

export const CurrentUser = createParamDecorator(
  (_data: never, context: ExecutionContext): AuthPayload => {
    const req = context.switchToHttp().getRequest();

    return req.user;
  }
);
