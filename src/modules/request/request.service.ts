import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw, In } from 'typeorm';
import {
  IGetRequestsByTags,
  IGetRequestsByUserId,
  INewRequest,
  ERequestStatus,
  IRequest,
  ErrorDelete,
} from './interfaces/request.interface';
import Request from './request.entity';
import { CommonService } from '../../common/common.service';
import {
  CommonIsSuccessResponse,
  GetDataResponseWithPage,
} from '../../common/types';

@Injectable()
export class RequestService extends CommonService {
  constructor(
    @InjectRepository(Request) private requestService: Repository<Request>,
  ) {
    super(requestService);
  }

  async createRequest(data: {
    request: INewRequest;
  }): Promise<CommonIsSuccessResponse<IRequest>> {
    try {
      const {
        request: {
          description,
          userId,
          tags,
          budget,
          products,
          isDraft,
          cover,
          readyForAnalogues,
          media,
          status,
          title,
        },
      } = data;
      const request = await this.save<INewRequest, IRequest>({
        description,
        userId,
        tags,
        budget,
        products: products || null,
        isDraft,
        readyForAnalogues,
        cover,
        media,
        status,
        title,
      });

      return {
        data: request,
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async updateRequest(
    request: IRequest,
  ): Promise<CommonIsSuccessResponse<IRequest>> {
    try {
      const currentRequest = await this.findOne<IRequest>(request.id);
      if (request.delete && currentRequest.status === ERequestStatus.DISABLE) {
        return {
          isSuccess: false,
          error: ErrorDelete,
        };
      }
      await this.save<Partial<IRequest>, IRequest>(request);
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async getRequestsByTags(
    data: IGetRequestsByTags,
  ): Promise<GetDataResponseWithPage<IRequest>> {
    const { tags, requestId, page, perPage, sort, statuses } = data;
    const skip = perPage ? perPage * (page - 1) : 1;
    try {
      const [requests, totalCount] =
        await this.findAndCountByCriteria<IRequest>({
          where: {
            ...(statuses ? { status: In(statuses) } : {}),
            tags: Raw(
              (tagsAlias) => `${tagsAlias} && ARRAY[:...tags]::varchar[]`,
              { tags },
            ),
            ...(requestId ? { id: requestId } : {}),
            delete: false,
          },
          order: {
            ...(sort
              ? Object.assign(
                  {},
                  ...sort.map((sortArray) => {
                    return { [sortArray.orderName]: sortArray.orderBy };
                  }),
                )
              : {}),
          },
          ...(page ? { skip } : {}),
          ...(perPage ? { take: perPage } : {}),
        });

      return {
        data: requests,
        pageInfo: {
          page,
          perPage,
          totalCount,
          totalPageCount: Math.ceil(totalCount / (perPage ? perPage : 1)),
        },
      };
    } catch (error) {
      return {
        data: [],
        pageInfo: {
          page,
          perPage,
          totalCount: 0,
          totalPageCount: 0,
        },
        error,
      };
    }
  }

  async getRequestsByUserId(
    data: IGetRequestsByUserId,
  ): Promise<GetDataResponseWithPage<IRequest>> {
    try {
      const { userId, requestId, page, perPage, sort, statuses } = data;
      const skip = perPage ? perPage * (page - 1) : 1;
      const [requests, totalCount] =
        await this.findAndCountByCriteria<IRequest>({
          where: {
            delete: false,
            ...(statuses ? { status: In(statuses) } : {}),
            ...(userId ? { userId } : {}),
            ...(requestId ? { id: requestId } : {}),
          },
          order: {
            ...(sort
              ? Object.assign(
                  {},
                  ...sort.map((sortArray) => {
                    return { [sortArray.orderName]: sortArray.orderBy };
                  }),
                )
              : {}),
          },
          ...(page ? { skip } : {}),
          ...(perPage ? { take: perPage } : {}),
        });
      return {
        data: requests,
        pageInfo: {
          page,
          perPage,
          totalCount,
          totalPageCount: Math.ceil(totalCount / (perPage ? perPage : 1)),
        },
      };
    } catch (error) {
      return {
        data: [],
        pageInfo: {
          page: 0,
          perPage: 0,
          totalCount: 0,
          totalPageCount: 0,
        },
        error,
      };
    }
  }
}
