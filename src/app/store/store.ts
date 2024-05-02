import { configureStore } from '@reduxjs/toolkit';
import { contentSlice, searchInputSlice, themeSlice } from '../slice';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    searchInput: searchInputSlice.reducer,
    content: contentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
