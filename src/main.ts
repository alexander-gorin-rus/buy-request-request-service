import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

const {
  url,
  packageNames: { REQUEST_PACKAGE },
} = configuration();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: REQUEST_PACKAGE.package,
        protoPath: [
          join(__dirname, '../protos/request-service/request.proto'),
          join(__dirname, '../protos/request-service/error.proto'),
        ],
        url: url,
        loader: {
          enums: String,
        },
      },
    },
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
  console.log(`Application is running on: ${url}`);
}
bootstrap();
