import { MailerModule } from '@nestjs-modules/mailer';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import {
  authConfig,
  DatabaseConfig,
  databaseConfig,
  MailConfig,
  mailConfig,
  miscConfig,
  rootConfig,
} from '../../config';
import { validateConfig } from '../../config/validation/config-validation';
import { morganDevFormat } from '../../tools/request-logger';
import { AuthModule } from '../auth/auth.module';
import { GooglAuthModule } from '../auth/google/google.module';
import { InvitationModule } from '../invitation/invitation.module';
import { ProjectModule } from '../project/project.module';
import { TeamModule } from '../team/team.module';
import { UserModule } from '../user/user.module';
import { RootController } from './root.controller';
import { RootService } from './root.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [rootConfig, databaseConfig, mailConfig, authConfig, miscConfig],
      cache: true,
      validate: validateConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbConfig = config.get<DatabaseConfig>('database');
        return {
          type: 'mongodb',
          useUnifiedTopology: true,
          useNewUrlParser: true,
          database: dbConfig.name,
          host: dbConfig.host,
          port: dbConfig.port,
          autoLoadEntities: true,
          synchronize: config.get('NODE_ENV') !== 'production',
        };
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const mailConfig = config.get<MailConfig>('mail');
        return {
          transport: {
            host: mailConfig.host,
            port: mailConfig.port,
            auth: {
              user: mailConfig.email,
              pass: mailConfig.pass,
            },
          },
          defaults: {
            from: "'The Secret Store' <no-reply@the-secret-store.com>",
          },
        };
      },
    }),
    MorganModule,
    AuthModule,
    GooglAuthModule,
    ProjectModule,
    UserModule,
    TeamModule,
    InvitationModule,
  ],
  controllers: [RootController],
  providers: [
    RootService,
    Logger,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: MorganInterceptor(morganDevFormat),
    },
  ],
})
export class RootModule {}
