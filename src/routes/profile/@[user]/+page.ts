import { firestore } from '$lib/firebase/stores';
import { orderBy, query, where } from 'firebase/firestore';
import { page_size } from '$lib/constants';

export async function load({ params }) {
  let q = await firestore.query(`posts`);
  q = query(q, where('author.uid', '==', params.user));
  q = query(q, orderBy('createdAt', 'desc'));
  const snapshot = await firestore.getDocuments(q);
  const articles = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const pdoc = await firestore.getDocument(`users/${params.user}`);

  return {
    articles,
    pages: snapshot.size / page_size,
    params,
    profile: { ...pdoc.data() }
  };
}
