import type { User } from '$lib/types';

export declare interface PostComment {
  id: string;
  author: User;
  body: string;
  createdAt: Date;
}

export class PostComment implements PostComment {
  constructor(comment: Partial<PostComment>) {
    Object.assign(this, comment);
  }
}
