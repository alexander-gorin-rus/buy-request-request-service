export interface IError {
  code: string;
  message: Array<string>;
}

export interface IPageInfo {
  page: number;
  perPage: number;
  totalCount: number;
  totalPageCount: number;
}

export type CommonIsSuccessResponse<D> = ICommonSuccess<D> | ICommonFailure;

interface ICommonSuccess<D> {
  data?: D;
  isSuccess: true;
}

interface ICommonFailure {
  isSuccess: false;
  error: IError;
}

export type GetDataResponseWithPage<D> =
  | ISuccessDataWithPage<D>
  | IFailureDataWithPage;

interface ISuccessDataWithPage<D> {
  data: D[];
  pageInfo: IPageInfo;
}

interface IFailureDataWithPage {
  data: [];
  pageInfo: IPageInfo;
  error: IError;
}

export interface ISort {
  orderBy: string;
  orderName: string;
}
