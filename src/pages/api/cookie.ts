import { setCookie, getCookie } from 'cookies-next';
import { NextApiResponse, NextApiRequest } from 'next';

export const tempHandler = (res: NextApiResponse, req: NextApiRequest) => {
  const myCookie = sessionStorage.getItem('token');
  setCookie('token', myCookie, { req, res });
  return getCookie('token', { req, res });
};
