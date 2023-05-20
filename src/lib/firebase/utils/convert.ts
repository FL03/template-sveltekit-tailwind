import type { DocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export interface FirestoreConverter<T> {
  toFirestore: (modelObject: T) => unknown;
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => T;
}
