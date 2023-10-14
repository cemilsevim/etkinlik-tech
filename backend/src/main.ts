import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all.exceptions.filter';
import { LoggerService } from './common/modules/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const httpAdapter = app.get(HttpAdapterHost);

    const config = new DocumentBuilder()
        .setTitle('Etkinlik Tech')
        .setDescription('The Etkinlik Tech API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalInterceptors(
        new ExceptionInterceptor(),
        new TransformInterceptor(),
    );

    app.useGlobalFilters(
        new AllExceptionsFilter(httpAdapter, new LoggerService()),
    );

    await app.listen(3000);
}
bootstrap();
