import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { extendArrayPrototype } from './shared/global';
import { Env } from './shared/enums/env.enum';
import { setupSwagger } from './swagger';
import { GLOBAL_LOGGER } from './shared/constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  extendArrayPrototype();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (configService.get<string>('NODE_ENV') === Env.DEV) {
    setupSwagger(app);
  }

  const port = configService.get('PORT');
  await app.listen(port);

  GLOBAL_LOGGER.log(`Server running on port ${port}`);
}

bootstrap();
