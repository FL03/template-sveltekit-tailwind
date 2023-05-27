export declare interface Provider<T = unknown> {
  config: T;
  name: string;
  scopes: string[];
}

export declare interface Settings {
  firebase?: import('firebase/app').FirebaseOptions;
  locale: string;
  providers?: Provider[];
  theme: string;
}

export class Settings implements Settings {
  constructor() {
    this.locale = 'en';
    this.theme = 'light';
  }
}
