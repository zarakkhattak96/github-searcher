import { createSlice } from '@reduxjs/toolkit';
import { IContentComponentProps } from '../utils/interfaces';

const searchInputInitialState = {
  username: '',
};

const contentInitialState: Partial<IContentComponentProps> = {
  userProfile: [],
};

export const contentSlice = createSlice({
  name: 'content',
  initialState: contentInitialState,
  reducers: {
    changeContent: (state, action) => {
      state.userProfile = action.payload.items[0];
    },
  },
});

export const searchInputSlice = createSlice({
  name: 'searchInput',
  initialState: searchInputInitialState,
  reducers: {
    changeSearchInput: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { changeSearchInput } = searchInputSlice.actions;
export const { changeContent } = contentSlice.actions;

const reducers = {
  searchInput: searchInputSlice.reducer,
  contentSlice: contentSlice.reducer,
};

export default reducers;
