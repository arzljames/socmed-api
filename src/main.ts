import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import swaggerconfig from './swagger';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //Swagger OpenAPI Documentation
  const document = SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT);
}
bootstrap();
