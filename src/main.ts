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
  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.enableCors({
    origin: ['http://localhost:3000', 'https://app-socmed.vercel.app'],
    methods: ["PUT", "DELETE", "GET", "POST", "*"],
    credentials: true,
  });

  //Swagger OpenAPI Documentation
  const document = SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT);
}
bootstrap();
