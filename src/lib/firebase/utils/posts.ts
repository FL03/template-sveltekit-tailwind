import { Timestamp, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import { page_size } from '$lib/constants';
import { firestore } from '$lib/firebase/stores';
import { Post } from '$lib/models/posts';

export async function getPosts(uid: string, start?: Timestamp): Promise<Post[]> {
  let q = await firestore.query(`posts`);
  q = query(q, where('author.uid', '==', uid));
  q = query(q, orderBy('createdAt', 'desc'));
  if (start) {
    q = query(q, startAfter('createdAt', start));
  }
  q = query(q, limit(page_size));
  const snapshot = await firestore.getDocuments(q);
  return snapshot.docs.map((doc) => new Post(doc.data().author).update({ ...doc.data() }));
}
