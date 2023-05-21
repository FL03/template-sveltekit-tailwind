export declare interface ApplicationProps {
  description: string;
  keywords: string;
  name: string;
  slug: string;
}

export const page_size = 10;

export const temporal = {
  ms: {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 4 * 7 * 24 * 60 * 60 * 1000
  },
  s: {
    minute: 60,
    hour: 60 * 60,
    day: 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    month: 4 * 7 * 24 * 60 * 60
  }
};
