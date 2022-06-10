import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [AuthModule, ProjectModule],
  providers: [],
})
export class AppModule {}
