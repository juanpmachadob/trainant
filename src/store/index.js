// #region Dependencies
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@/store/rootReducer'
// #endregion

/**
 * Redux store configuration
 */
const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
