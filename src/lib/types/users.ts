import type { Filter } from '$lib/types/filters';

export declare interface UserFilter extends Filter {
  name?: string;
}

export declare interface HumanName {
  first?: string;
  last?: string;
  middle?: string;
  suffix?: string;
  prefix?: string;
}
export declare interface UserName {
  name: HumanName;
  username: string;
}

export declare interface User {
  name: string;
  email: string;
  email_verified?: boolean;
  picture?: string;
  phone_number?: string;
  uid: string;
  username?: string;
  [key: string]: any;
}
