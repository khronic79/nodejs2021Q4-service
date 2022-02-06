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
  let app;
  const platform = process.env['PLATFORM'];
  switch (platform) {
    case 'express': {
      app = await NestFactory.create<NestExpressApplication>(AppModule);
      break;
    }
    case 'fastify': {
      app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
      );
      app.register(FastifyFormidable);
      break;
    }
  }
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(4000);
}
bootstrap();
