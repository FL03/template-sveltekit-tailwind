import type { User } from '$lib/types';

export declare interface Profile {
  favorites?: string[];
  user: User;
}

export class Profile implements Profile {
  constructor(user: User) {
    this.user = user;
  }
  set setFavorites(favorites: string[]) {
    this.favorites = favorites;
  }
}
