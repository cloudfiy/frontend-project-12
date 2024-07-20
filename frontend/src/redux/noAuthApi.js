import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../shared/constants';

const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const authApiInstance = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithoutAuth,
  endpoints: () => ({}),
});

export default authApiInstance;
