import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  IGetRequestsByTags,
  IGetRequestsByUserId,
  INewRequest,
  IRequest,
} from './interfaces/request.interface';
import { RequestService } from './request.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  EVENTS,
  RequestCreatedEvent,
} from '../../common/events/request.created.event';
import {
  CommonIsSuccessResponse,
  GetDataResponseWithPage,
} from '../../common/types';
import configuration from '../../config/configuration';

@Controller()
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private eventEmitter: EventEmitter2,
  ) {}

  @GrpcMethod('RequestService')
  async getRequestsByUserId(
    data: IGetRequestsByUserId,
  ): Promise<GetDataResponseWithPage<IRequest>> {
    return await this.requestService.getRequestsByUserId(data);
  }

  @GrpcMethod('RequestService')
  async getRequestsByTags(
    data: IGetRequestsByTags,
  ): Promise<GetDataResponseWithPage<IRequest>> {
    return await this.requestService.getRequestsByTags(data);
  }

  @GrpcMethod('RequestService')
  async getRequestsById(data: {
    requestId: string;
  }): Promise<GetDataResponseWithPage<IRequest>> {
    return await this.requestService.getRequestsByUserId(data);
  }

  @GrpcMethod('RequestService')
  async createRequest(data: {
    locale: string;
    request: INewRequest;
  }): Promise<CommonIsSuccessResponse<IRequest>> {
    const response = await this.requestService.createRequest(data);
    const locale = data.locale;
    const { isSuccess } = response;
    if (isSuccess) {
      const { data: requestEntity } = response;
      const { id: requestId, tags, description } = requestEntity;
      const link = configuration().urlDashboard + '/requests/' + requestId;
      this.eventEmitter.emit(
        EVENTS.NEW_REQUEST_CREATED,
        new RequestCreatedEvent({ requestId, tags, locale, link, description }),
      );
    }
    return response;
  }

  @GrpcMethod('RequestService')
  async updateRequest(data: {
    request: IRequest;
  }): Promise<CommonIsSuccessResponse<IRequest>> {
    return await this.requestService.updateRequest(data.request);
  }
}
