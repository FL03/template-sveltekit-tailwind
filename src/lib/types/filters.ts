import { page_size } from '$lib/constants';
import type { Timestamp } from 'firebase/firestore';

export declare interface DateFilter {
  start?: Timestamp;
  end?: Timestamp;
}

export declare interface LimitFilter {
  limit: number;
}

export declare interface Filter extends LimitFilter {
  start: Timestamp | null;
}

export class Filter implements Filter {
  constructor(filter: Partial<Filter> | null) {
    this.start = filter?.start || null;
    this.limit = filter?.limit || page_size;
  }
}
