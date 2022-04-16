import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ResponseDto } from '@the-secret-store/api-interfaces/dtos/common/response.output.dto';

export const Serialize = (dto: ClassConstructor<unknown>) =>
  UseInterceptors(new SerializeInterceptor(dto));

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dtoClass: ClassConstructor<unknown>) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler<unknown>
  ): Observable<unknown> | Promise<Observable<unknown>> {
    return next.handle().pipe(
      map(
        (response: ResponseDto<unknown>): ResponseDto<unknown> => ({
          message: response.message,
          result: plainToInstance(this.dtoClass, response.result, {
            excludeExtraneousValues: true,
            exposeUnsetFields: true,
            exposeDefaultValues: true,
          }),
        })
      )
    );
  }
}
