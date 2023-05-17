import { page_size } from '$lib/constants';

export declare interface DateFilter {
  start?: Date;
  end?: Date;
}

export declare interface LimitFilter {
  limit: number;
}

export declare interface Filter extends LimitFilter {
  start: Date | null;
}

export class Filter implements Filter {
  constructor(filter: Partial<Filter> | null) {
    this.start = filter?.start || null;
    this.limit = filter?.limit || page_size;
  }
}
