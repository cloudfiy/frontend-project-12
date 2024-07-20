import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, USER } from '../shared/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const user = localStorage.getItem(USER);

    if (user) {
      const { token } = JSON.parse(user);
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const isLoginRequest = args.url.includes('/login');

  if (result.error && result.error.status === 401 && !isLoginRequest) {
    window.location.href = '/login';
    localStorage.removeItem(USER);
  }

  return result;
};

const $api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default $api;
