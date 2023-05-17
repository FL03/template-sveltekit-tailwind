import type { User } from './users';

export declare interface Settings {
  name: string;
}

export declare interface Session {
  user: User | null;
}

export class Session implements Session {
  constructor() {
    this.user = null;
  }
  currentUser(): User | null {
    return this.user;
  }
}
