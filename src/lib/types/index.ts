import type { Filter } from './filters.ts';
export { Filter };

import type { Session } from './session.ts';
export { Session };

import type { User, UserFilter, UserName } from './users.ts';
export { User, UserFilter, UserName };

export interface Link {
  href: string;
  label: string;
  protected?: boolean;
}

export declare interface Theme {
  mode: 'light' | 'dark';
}
