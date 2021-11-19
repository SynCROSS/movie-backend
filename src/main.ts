import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import * as session from 'express-session';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser(process.env.SECRET_KEY));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.SECRET_KEY,
      cookie: {
        httpOnly: true,
        secure: false,
        signed: true,
      },
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: false,
  });
  await app.listen(4000);
}
bootstrap();
