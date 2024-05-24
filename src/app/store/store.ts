import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  cacheClearSlice,
  searchInputSlice,
  userProfileSlice,
  userRepoSlice,
} from '../slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Config to persist the data to the localStorage under the key "root"
const persistConfig = {
  key: 'userData',
  storage,
};

const rootReducer = combineReducers({
  searchInput: searchInputSlice.reducer,
  profile: userProfileSlice.reducer,
  repos: userRepoSlice.reducer,
  clearUserData: cacheClearSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

//persistedStore to be passed to the PersistGate
export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
