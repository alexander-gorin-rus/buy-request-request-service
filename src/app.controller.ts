import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OnEvent } from '@nestjs/event-emitter';
import { AmqpService } from './amqp/amqp.service';
import { ConfigService } from '@nestjs/config';
import { INewRequestCreated } from './modules/request/interfaces/request.interface';
import { EVENTS } from './common/events/request.created.event';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private amqpService: AmqpService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @OnEvent(EVENTS.NEW_REQUEST_CREATED)
  async handleNewRequestCreatedEvent(payload: INewRequestCreated) {
    await this.amqpService.publish<INewRequestCreated>(
      this.config.get('amqp').exchanges.events.name,
      'event.request-service.newRequest.created',
      'requestService.NewRequestCreated',
      payload,
    );
  }
}
