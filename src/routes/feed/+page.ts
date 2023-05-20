import { firestore } from '$lib/firebase/stores';
import { query, orderBy } from 'firebase/firestore';
import { page_size } from '$lib/constants';
import { postConverter } from '$lib/models/posts';

export async function load({ params }) {
  let q = await firestore.query(`posts`);
  q = query(q, orderBy('createdAt', 'desc'));
  const snapshot = await firestore.getDocuments(q);
  const articles = snapshot.docs.map((doc) => postConverter.fromFirestore(doc, {}));
  return {
    articles,
    pages: snapshot.size / page_size
  };
}
