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
  full(): string;
}

export declare interface UserName {
  name: HumanName;
  username: string;
}

export declare interface UserMetadata {
  created?: Date;
  updated?: Date;
}

export declare interface User {
  name: string;
  email: string;
  email_verified?: boolean;
  metadata?: UserMetadata;
  phone_number?: string;
  picture?: string;
  uid: string;
  username?: string;
  [key: string]: unknown;
}

export class User implements User {
  constructor() {
    this.name = '';
    this.email = '';
    this.uid = '';
  }
  set with(val: Partial<User>) {
    Object.assign(this, val);
  }
}
