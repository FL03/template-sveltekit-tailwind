import { Timestamp, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { page_size, postConverter } from '$lib';
import { firestore } from '$lib/firebase';

export async function getPosts(uid: string, start?: Timestamp): Promise<import('$lib').Post[]> {
  let q = await firestore.query(`posts`);
  q = query(q, where('author.uid', '==', uid));
  q = query(q, orderBy('createdAt', 'desc'));
  if (start) {
    q = query(q, startAfter('createdAt', start));
  }
  q = query(q, limit(page_size));
  const snapshot = await firestore.getDocuments(q);
  return snapshot.docs.map((doc) => postConverter.fromFirestore(doc, {}));
}
