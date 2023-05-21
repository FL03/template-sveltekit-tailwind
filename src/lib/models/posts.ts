import type { FirestoreConverter } from '$lib/firebase/utils';
import type { Filter, User } from '$lib/types';
import { GeoPoint, Timestamp } from 'firebase/firestore';
import type { DocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

import { geohashForLocation } from 'geofire-common';

/**
 * Geolocation information for a post
 * @param geopoint - Firestore GeoPoint
 * @param geohash - Geohash for the GeoPoint
 * @param latlng - Google Maps LatLng object
 */
export declare interface PostGeodata {
  geopoint: GeoPoint;
  geohash: string;
}

export class PostGeodata implements PostGeodata {
  constructor() {
    this.geopoint = new GeoPoint(0, 0);
    this.geohash = geohashForLocation([this.geopoint.latitude, this.geopoint.longitude]);
  }
  new(geopoint: GeoPoint): PostGeodata {
    return new PostGeodata().update(geopoint);
  }
  update(geopoint: GeoPoint): PostGeodata {
    this.geopoint = geopoint;
    this.geohash = geohashForLocation([geopoint.latitude, geopoint.longitude]);
    return this;
  }
  set at(geopoint: GeoPoint) {
    this.geopoint = geopoint;
    this.geohash = geohashForLocation([geopoint.latitude, geopoint.longitude]);
  }
  get latlng(): google.maps.LatLng {
    return new google.maps.LatLng(this.geopoint.latitude, this.geopoint.longitude);
  }
}

export declare interface PostMetadata {
  categories?: string[];
  favorites?: string[];
  keywords?: string[];
  link?: string;
  published: boolean;
  updated?: Date;
}

export declare interface PostData {
  body: string;
  createdAt: Timestamp;
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
    this.createdAt = Timestamp.now();
    this.published = false;
  }
  update(obj: Partial<Post>): Post {
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
    return new Post(data?.author).update({ ...data });
  }
};
