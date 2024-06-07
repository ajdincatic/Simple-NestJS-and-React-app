import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { VERSION } from './shared/constants';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setVersion(VERSION)
    .setTitle('NestJS')
    .addApiKey({ type: 'apiKey', in: 'header' }, 'Api-Key')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);
}
