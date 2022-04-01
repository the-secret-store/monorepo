import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile, open, FileHandle, readFile } from 'fs/promises';
import * as pc from 'picocolors';
import { RootConfig } from '../config';
import { docTags } from '../constants/api-tags';

export async function setupDocs(app: INestApplication) {
  const { docsRoute } = app.get(ConfigService).get<RootConfig>('root');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('The Secret Store api')
    .setDescription('This is the api for the secret store project')
    .setVersion('1.0')
    .addBearerAuth({
      name: 'JWT',
      type: 'http',
      description: 'Some routes require a JWT token',
    })
    .addTag(docTags.auth.name)
    .addTag(docTags.user.name)
    .addTag(docTags.project.name)
    .addTag(docTags.team.name)
    .addTag(docTags.invitation.name)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(docsRoute, app, document);

  const apiSpecificationFile = `${process.cwd()}/docs/collections/api-specification.json`;
  const filehandle: FileHandle = await open(apiSpecificationFile, 'w');
  readFile(apiSpecificationFile).then(async data => {
    if (data.toString() !== JSON.stringify(document))
      await writeFile(filehandle, JSON.stringify(document, null, 2));
    await filehandle.close();
  });

  const logger = app.get(Logger);
  logger.log(
    `Serving docs at ${`${pc.blue(`${await app.getUrl()}/${docsRoute}`)}`}`,
    'ApplicationRoot'
  );
}
