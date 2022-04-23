import { Logger } from '@nestjs/common';

export function Deprecated(reason?: string, alternative?: string): MethodDecorator {
  return (target: unknown, key: string | symbol, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = (...args: unknown[]) => {
      Logger.warn(`${String(key)} is deprecated`, 'deprecated');
      if (reason) Logger.warn(reason, 'deprecated');
      if (alternative) Logger.warn(`Use ${alternative} instead`, 'deprecated');
      original(...args);
    };
    return descriptor;
  };
}
