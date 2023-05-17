import type { User } from '$lib/types';

export declare interface Comment {
  id: string;
  author: User;
  body: string;
  createdAt: Date;
}

export class Comment implements Comment {
  constructor(comment: Partial<Comment>) {
    Object.assign(this, comment);
  }
}
