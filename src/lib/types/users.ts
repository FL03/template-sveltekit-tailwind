import type { FirestoreConverter } from '$lib/firebase';
import type { DocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export declare interface HumanName {
  first?: string;
  last?: string;
  middle?: string;
  suffix?: string;
  prefix?: string;
  full(): string;
}

export class HumanName implements HumanName {
  constructor() {
    this.first = '';
    this.last = '';
    this.middle = '';
    this.suffix = '';
    this.prefix = '';
  }
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
  email: string;
  email_verified?: boolean;
  metadata?: UserMetadata;
  name: string;
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
}

// Firestore data converter
export const userConverter: FirestoreConverter<User> = {
  toFirestore: (data: User) => {
    return {
      ...data
    };
  },
  fromFirestore: (
    snapshot: DocumentSnapshot | import('firebase-admin/firestore').DocumentSnapshot,
    options?: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return {
      email: data?.email,
      name: data?.name,
      uid: data?.uid,
      ...data
    };
  }
};
