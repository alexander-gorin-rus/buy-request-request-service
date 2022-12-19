import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestModule } from './modules/request/request.module';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AmqpModule } from './amqp/amqp.module';
import configuration from './config/configuration';
import { CommonModule } from './common/common.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AmqpService } from './amqp/amqp.service';

const { databaseDefaultConfig, applicationName, amqp } = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      ...databaseDefaultConfig,
    }),
    EventEmitterModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(applicationName, {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [amqp.exchanges.events],
      uri: `amqp://${amqp.username}:${amqp.password}@${amqp.hostname}:${amqp.port}`,
      connectionInitOptions: { wait: false },
    }),
    AmqpModule,
    RequestModule,
    CommonModule,
  ],
  controllers: [AppController],
  exports: [AmqpModule, AmqpService, AppModule],
  providers: [AppService, AmqpService],
})
export class AppModule {}
