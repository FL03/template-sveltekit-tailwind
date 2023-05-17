import type { Filter, User } from '$lib/types';

export declare interface PostGeodata {
  latlang: google.maps.LatLng | google.maps.LatLngLiteral;
}

export declare interface PostMetadata {
  categories?: string[];
  description?: string;
  geo: PostGeodata;
  keywords?: string[];
  link?: string;
  published: Date | string | number;
  updated?: Date | string | number;
}

export declare interface Post extends PostMetadata {
  author: User;
  id: string;
  title: string;
  body: string | string[];
  slug: string;
  tags: string[];
  createdAt: Date;
  favorites: string[];
  [key: string]: any;
}

export declare interface PostFilter extends Filter {
  categories?: string[];
  keywords?: string[];
}
