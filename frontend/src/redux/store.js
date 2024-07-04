import { configureStore } from '@reduxjs/toolkit'

import { authApi } from '../services/authApi'
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authReducer.reducerPath]: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})

export default store
