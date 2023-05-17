import type { User } from '$lib/types';

export declare interface Profile {
  favorites?: string[];
  user?: User;
}

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error?: string;
}
