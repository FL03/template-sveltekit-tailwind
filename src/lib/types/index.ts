export * from './filters';
export * from './session';
export * from './settings';
export * from './users';

export interface Link {
  href: string;
  label: string;
  protected?: boolean;
}

export declare interface Theme {
  mode: 'light' | 'dark';
}
