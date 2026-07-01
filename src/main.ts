import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Ativa a Validação Global (usando seus DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 2. Configuração da documentação do Swagger
  const config = new DocumentBuilder()
    .setTitle('PokeTeam Manager API')
    .setDescription('API RESTful para gerenciamento de Treinadores e seus Times de Pokémon')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // É esta linha que cria a rota /api/docs no seu navegador!
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();