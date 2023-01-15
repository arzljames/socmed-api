import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

const swaggerconfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('SocMed APIs')
  .setDescription('SocMed API documentation')
  .setVersion('1.0')
  .addTag('Social Media Platform')
  .build();

export default swaggerconfig;
