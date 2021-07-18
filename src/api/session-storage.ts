export interface JwtSession {
  jwt?: string;
  refresh?: string;
  google?: string;
}

type Key = 'token.jwt' | 'token.refresh' | 'token.google';

const storage = (session?: boolean) => ({
  getItem: (k: Key) => sessionStorage.getItem(k) || localStorage.getItem(k),
  setItem: (k: Key, v: string) => (session
    ? sessionStorage.setItem(k, v)
    : localStorage.setItem(k, v)),
  removeItem: (k: Key) => {
    sessionStorage.removeItem(k);
    localStorage.removeItem(k);
  },
});

export const getSession = (): JwtSession | undefined => {
  const { getItem } = storage();
  const jwt = getItem('token.jwt');
  const refresh = getItem('token.refresh') || '';
  const google = getItem('token.google');

  if (!jwt && !google) {
    return undefined;
  }

  return { jwt, refresh, google };
};

export const setSession = (
  { jwt, refresh }: JwtSession,
  session?: boolean,
): boolean => {
  const current = getSession();

  if (current?.jwt === jwt) {
    return false;
  }

  const { setItem } = storage(session);
  setItem('token.jwt', jwt || '');
  setItem('token.refresh', refresh || '');

  return true;
};

export const setGoogleSession = (
  { google }: JwtSession,
  session?: boolean,
): boolean => {
  const current = getSession();

  if (current?.google === google) {
    return false;
  }

  const { setItem } = storage(session);
  setItem('token.google', google || '');

  return true;
};

export const removeSession = () => {
  storage().removeItem('token.jwt');
  storage().removeItem('token.google');
};
