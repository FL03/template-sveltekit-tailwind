export interface Banner {
  title: string;
  subtitle: string;
}

export interface Props {
  class: string;
}

export interface AppProps {
  appellation: {
    name: string;
    slug: string;
  };
}

export interface Session {
  user: {
    name: string;
    email: string;
    email_verified: boolean;
    uid: string;
  } | null;
}
