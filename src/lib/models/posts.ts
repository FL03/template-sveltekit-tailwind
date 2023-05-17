import type { Filter, User } from '$lib/types';

/**
 * Geolocation information for a post
 * @param geopoint - Firestore GeoPoint
 * @param geohash - Geohash for the GeoPoint
 * @param latlng - Google Maps LatLng object
 */
export declare interface PostGeodata {
  latlng: google.maps.LatLng;
  geohash: string;
}

export class PostGeodata implements PostGeodata {
  constructor() {
    this.latlng = new GeoPoint(0, 0);
  }
  set update(geopoint: GeoPoint) {
    this.geopoint = geopoint;
    this.geohash = geohashForLocation([geopoint.latitude, geopoint.longitude]);
  }
  get lati(): google.maps.LatLng {
    return new google.maps.LatLng(this.geopoint.latitude, this.geopoint.longitude);
  }
}

export declare interface PostMetadata {
  categories?: string[];
  favorites?: string[];
  keywords?: string[];
  link?: string;
  updated?: Date;
}

export declare interface PostData {
  body: string;
  createdAt: Date;
  description?: string;
  tags: string[];
  title: string;
}

export declare interface Author {
  email: string;
  uid: string;
  username: string;
  [key: string]: unknown;
}

export class Author implements Author {
  constructor(email: string, uid: string, username: string) {
    this.email = email;
    this.uid = uid;
    this.username = username;
  }
  set fromUser(user: User) {
    this.email = user.email;
    this.uid = user.uid;
    this.username = user.username || user.name.toLowerCase().replace(/\s/g, '');
    Object.assign(this, user);
  }
}

export declare interface Post extends PostData, PostMetadata {
  id: string;
  author: User;
  geo?: PostGeodata; // geolocation information; switch to GeoHash for better indexing in firestore
  slug: string;
  [key: string]: unknown;
}

export class Post implements Post {
  constructor(author: User) {
    this.author = author;
    this.id = '';
    this.title = '';
    this.body = '';
    this.slug = '';
    this.tags = [];
    this.favorites = [];
    this.description = '';
    this.createdAt = new Date();
  }
  with(obj: Partial<Post>): Post {
    return Object.assign(this, obj);
  }
}

export declare interface PostFilter extends Filter {
  categories?: string[];
  keywords?: string[];
}

// Firestore data converter
export const postConverter: FirestoreConverter<Post> = {
  toFirestore: (data: Post) => {
    return {
      ...data
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new Post(data?.author).with({ ...data });
  }
};
