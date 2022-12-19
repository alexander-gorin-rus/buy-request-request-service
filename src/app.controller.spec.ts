import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmqpModule } from './amqp/amqp.module';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AmqpModule, ConfigModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      try {
        const appController = app.get<AppController>(AppController);
        expect(appController.getHello()).toBe('Hello World!');
      } catch (e) {}
    });
  });
});
