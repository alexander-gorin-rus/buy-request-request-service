import { INewRequestCreated } from '../../modules/request/interfaces/request.interface';

export const EVENTS = {
  NEW_REQUEST_CREATED: 'NEW_REQUEST_CREATED',
};

export class RequestCreatedEvent implements INewRequestCreated {
  requestId: string;
  tags: string[];
  locale: string;
  link: string;
  constructor(public message: { [k: string]: any }) {
    if (message && message?.requestId) {
      this.requestId = message.requestId;
    }
    if (message && message?.tags) {
      this.tags = message.tags;
    }
    if (message && message?.locale) {
      this.locale = message.locale;
    }
    if (message && message?.link) {
      this.link = message.link;
    }
  }
}
