import { createSlice } from '@reduxjs/toolkit';
// import { ISearchInputProps } from '../../utils/interfaces.utils';

const themeInitialState = {
  theme: 'light',
};

const searchInputInitialState = {
  username: '',
  // setUsername: () => {},
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
// export default themeSlice.reducer;

const reducers = {
  theme: themeSlice.reducer,
  searchInput: searchInputSlice.reducer,
};

export default reducers;
