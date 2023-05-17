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
