import { ISort, IError } from '../../../common/types';

export interface INewRequest {
  userId: string;
  description: string;
  budget: number;
  tags: string[];
  title: string;
  products?: string[];
  isDraft: boolean;
  status?: ERequestStatus;
  readyForAnalogues: boolean;
  cover?: string;
  delete?: boolean;
  media?: Media[];
}

export interface IRequest extends INewRequest {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Media {
  fileOriginalName: string;
  fileNameMinio: string;
  mimetype: string;
  bucket: typeof bucketType;
}

const bucketType = {
  OFFER: 'offer',
  REQUEST: 'request',
};

export enum ERequestStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DISABLE = 'DISABLE',
  DELETABLE = 'DELETABLE',
  DEFAULT_IN_PROGRESS = 'DEFAULT_IN_PROGRESS',
}

export const ErrorDelete = {
  message: ['NOT DELETE FOR THIS STATUS'],
  code: 'NOT DELETE FOR THIS STATUS',
} as IError;

export interface INewRequestCreated {
  requestId: string;
  tags: string[];
  locale: string;
  link: string;
}

export interface IGetRequestsByUserId {
  sort?: ISort[];
  userId?: string;
  requestId?: string;
  page?: number;
  perPage?: number;
  statuses?: ERequestStatus[];
}

export interface IGetRequestsByTags {
  sort?: ISort[];
  tags: string[];
  requestId?: string;
  page?: number;
  perPage?: number;
  statuses?: ERequestStatus[];
}
