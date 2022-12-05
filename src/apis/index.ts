import axios from 'axios';
import qs from 'qs';
import { deleteCookie, getCookie } from 'cookies-next';
import Router from 'next/router';

const refreshToken = getCookie('refreshToken');
const userId = getCookie('userId');

const refresh = async () => {
  const res = await instance.post(`/users/${userId}/reissue/version2`, {
    refreshToken,
  });

  const newAccessToken = res.data.result.accessToken;
  instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
};

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_BASE_URL
      : process.env.NEXT_PUBLIC_PRODUCTION_API_BASE_URL,
  paramsSerializer: {
    serialize: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  },
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

instance.interceptors.request.use((config: any) => {
  if (
    config.url === '/imgUpload/array' ||
    config.url === '/imgUpload/single' ||
    config.url === '/users/profile-image' ||
    config.url === '/users/certification/document' ||
    config.url === '/users/recruiter/document'
  ) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.data && error.response.data.errorCode === 'JwtError') {
      // refresh token 만료시
      if (error.response.data.message === '로그인을 다시해주세요') {
        sessionStorage?.clear();
        localStorage?.clear();
        instance.defaults.headers.common.Authorization = '';

        deleteCookie('refreshToken');
        deleteCookie('userId');
        alert('로그인이 만료되었습니다.');
        return Router.reload();
      }

      refresh();
      const res = await instance.post(`/users/${userId}/reissue/version2`, {
        refreshToken,
      });
      const newAccessToken = res.data.result.accessToken;

      return instance({ ...error.config, headers: { Authorization: `Bearer ${newAccessToken}` } });
    }

    return Promise.reject(error);
  }
);
