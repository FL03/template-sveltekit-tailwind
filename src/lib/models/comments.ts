import type { User } from '$lib/types';

export declare interface Comment {
  id: string;
  author: User;
  body?: string;
  createdAt: Date;
}
