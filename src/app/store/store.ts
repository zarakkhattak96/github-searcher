import { configureStore } from '@reduxjs/toolkit';
import { contentSlice, searchInputSlice } from '../slice';

export const store = configureStore({
  reducer: {
    searchInput: searchInputSlice.reducer,
    content: contentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
