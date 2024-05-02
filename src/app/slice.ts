import { createSlice } from '@reduxjs/toolkit';
import { IContentComponentProps } from '../utils/interfaces';
// import { ISearchInputProps } from '../../utils/interfaces.utils';

const themeInitialState = {
  theme: 'light',
};

const searchInputInitialState = {
  username: '',
  // setUsername: () => {},
};

const contentInitialState: Partial<IContentComponentProps> = {
  userProfile: [],
  isRepoExpanded: false,
  expandedUserRepos: [],
  activeColor: '',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const contentSlice = createSlice({
  name: 'content',
  initialState: contentInitialState,
  reducers: {
    changeContent: (state, action) => {
      state.userProfile = action.payload.items[0];
      state.expandedUserRepos = action.payload.items[0].repos_url;
      state.isRepoExpanded = false;
      state.activeColor = action.payload.items[0].background;
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

export const { changeTheme } = themeSlice.actions;
export const { changeSearchInput } = searchInputSlice.actions;
export const { changeContent } = contentSlice.actions;
// export default themeSlice.reducer;

const reducers = {
  theme: themeSlice.reducer,
  searchInput: searchInputSlice.reducer,
  contentSlice: contentSlice.reducer,
};

export default reducers;
