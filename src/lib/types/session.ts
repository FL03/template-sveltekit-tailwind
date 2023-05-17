import type { User } from './users.ts';

export declare interface Settings {
  name: string;
}

export declare interface Session {
  user?: User | null;
}
