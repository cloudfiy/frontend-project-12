import { configureStore } from '@reduxjs/toolkit';

import { authApi, channelsApi, messagesApi } from './services';
import { userSlice, channelsSlice } from './slices';

const store = configureStore({
  reducer: {
    user: userSlice,
    channels: channelsSlice,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
});

export default store;
