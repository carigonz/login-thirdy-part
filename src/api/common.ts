/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { getSession } from './session-storage';
import { removeSession } from '../api/session-storage';

export type ErrorResponse = Error & { response?: Response; reason: string };


const logOut = () => {
  removeSession();
  window.location.href = `${window.location.origin}/signin`;
};

const getEndpoints = () => 'http://localhost:5000';

export const headers = {
  get: () => ({
    Accept: 'application/json',
  }),
  post: () => ({
    Accept: 'application/json',
    type: 'cors',
    'Content-Type': 'application/json; charset=utf-8',
  }),
  getToken: (): {} | { Authorization: string } => {
    const token = getSession();

    return token && token.jwt ? { Authorization: `Bearer ${token.jwt}` } : {};
  },
};

const checkError = async (response: Response) => {
  if (response.ok) {
    return response;
  }

  const error: ErrorResponse = new Error(response.statusText) as ErrorResponse;
  error.response = response;

  try {
    const text = await response.text();
    const reason: string = JSON.parse(text).error;

    error.reason = reason;
  // eslint-disable-next-line no-empty
  } catch (_) {
  }
  throw error;
};

const checkValidJWT = (response: Response) => {
  const token = getSession();

  if (response.headers.get('jwt-needs-refresh')
    && token
    && token.refresh
  ) {
    // eslint-disable-next-line no-console
    console.log('Needs to refresh token');
  }
  return response;
};

const parseToJSON = (response: Response) => {
  const contentType = response.headers.get('content-type');

  if (!contentType || contentType.indexOf('application/json') >= 0) {
    return response.json().catch(() => ({}));
  }
  return response;
};

export const api = (
  url: string,
  args: RequestInit = { },
) => {
  // eslint-disable-next-line no-param-reassign
  args.headers = args.headers || {};

  return fetch(`${getEndpoints()}${url}`, args)
    .then(checkError)
    .then(checkValidJWT)
    .then(parseToJSON);
};

const catchError = (
  url: string,
  args: RequestInit = {},
) => async (error: ErrorResponse): Promise<unknown> => {
  const token = getSession();
  // Needs and can refresh the token.
  if (error.response?.status === 401
      && error.reason === 'EXPIRED_TOKEN'
      && token?.jwt
      && token?.refresh
  ) {
    // Here needs to check if token was expired and try again but not time to develop that feature
    // await refreshToken();
    return logOut();
  }

  console.log(`${url} Failed with error: ${error} ${error.reason}`);
  throw error;
};

export const authenticatedApi = (
  url: string,
  args: RequestInit = {},
) => {
  args.headers = {
    ...args.headers,
    ...headers.getToken(),
  };
  

  return api(url, args).catch(catchError(url, args));
};

export const post = <Payload = any, Response = any>
  (url: string, payload: Payload): Promise<Response> => api(
    url,
    {
      method: 'POST',
      headers: headers.post(),
      body: JSON.stringify(payload),
    },
  );

export const authenticatedGet = <Response = any>
  (url: string): Promise<Response> => {
  return authenticatedApi(url, { headers: headers.get() });
};

export const authenticatedPost = <Payload = any, Response = any>
  (url: string, payload: Payload): Promise<Response> => authenticatedApi(
    url,
    {
      method: 'POST',
      headers: headers.post(),
      body: JSON.stringify(payload),
    },
  );
