import { createSlice } from '@reduxjs/toolkit';
import { IContentComponentProps } from '../utils/interfaces';

const searchInputInitialState = {
  username: '',
};

const contentInitialState: Partial<IContentComponentProps> = {
  userProfile: [],
  isRepoExpanded: false,
  expandedUserRepos: [],
  activeColor: '',
};

export const contentSlice = createSlice({
  name: 'content',
  initialState: contentInitialState,
  reducers: {
    changeContent: (state, action) => {
      state.userProfile = action.payload.items[0];
      state.expandedUserRepos = action.payload.items[0]?.repos_url;
      state.isRepoExpanded = false;
      state.activeColor = action.payload.items[0]?.background;
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
