import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import FastifyFormidable from 'fastify-formidable';

async function bootstrap() {
  let app: NestExpressApplication | NestFastifyApplication;
  const USE_FASTIFY = process.env['USE_FASTIFY'];
  switch (USE_FASTIFY) {
    case 'false': {
      app = await NestFactory.create<NestExpressApplication>(AppModule);
      break;
    }
    case 'true': {
      app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
      );
      app.register(FastifyFormidable);
      break;
    }
  }
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const PORT = process.env['PORT'];
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
