import { ReposInitialState, UserProfileState } from './types/reduxTypes';

export const searchInputInitialState = {
  username: '',
};

export const clearCacheInitialState = {
  userProfiles: {
    items: [],
    total_count: 0,
  },

  userRepos: {
    items: [],
    total_count: 0,
  },
};

export const reposInitialState: ReposInitialState = {
  userRepos: {
    items: [],
    total_count: 0,
  },
  currentUsername: '',
  loading: false,
  error: null,
  requests: {},
};

export const profileInitialState: UserProfileState = {
  userProfiles: {
    items: [],
    total_count: 0,
  },
  currentUsername: '', //to check current username from the request; query === username from cache
  loading: false,
  error: null,
  requests: {},
};
