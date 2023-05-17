export declare interface Settings {
  theme: string;
  language: string;
}

export class Settings implements Settings {
  constructor() {
    this.theme = 'dark';
    this.language = 'en';
  }
  set setTheme(theme: string) {
    this.theme = theme;
  }
  set setLanguage(language: string) {
    this.language = language;
  }
}
