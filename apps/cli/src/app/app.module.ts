import { Module } from '@nestjs/common';
import { TaskRunner } from '../task/task.command';

@Module({
  imports: [],
  providers: [TaskRunner],
})
export class AppModule {}
