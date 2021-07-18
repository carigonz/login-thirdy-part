import { Jwt } from 'jsonwebtoken';
import User from '../types/user'
import { authenticatedGet, post } from './common';
import { setSession } from './session-storage';

export const getUser = async (): Promise<User> => (
  await authenticatedGet('/api/v0/users/me')
  );

export const getCurrentUser = async (): Promise<User | null> => {
  return await authenticatedGet('/api/v0/users/me');
};

export const authenticate = (
  email: string,
  password: string,
): Promise<Jwt> => post(
  '/authenticate',
  { email, password },
).then((jwt: any) => {
  setSession(jwt);
  return jwt;
});

const logout = () => localStorage.removeItem('user');

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUser, logout };