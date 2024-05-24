import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfiles } from './thunk/fetchUserThunk';
import { fetchUserRepos } from '../redux/thunk/fetchReposThunk';
import {
  profileInitialState,
  reposInitialState,
  searchInputInitialState,
} from './initialStates';

export const userProfileSlice = createSlice({
  name: 'profileSlice',
  initialState: profileInitialState,
  reducers: {
    changeUserProfile: (state, action) => {
      state.userProfiles.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfiles.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        if (action.meta?.arg) {
          const { query, page } = action.meta.arg;
          if (state.requests?.[query]) {
            state.requests[query] = {
              ...state.requests?.[query],
              [page]: {
                status: 'pending',
                items: [],
              },
            };
          } else {
            state.requests[query] = {
              [page]: {
                status: 'pending',
                items: [],
              },
            };
          }
        }
      })

      .addCase(fetchUserProfiles.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta?.arg) {
          const { query, page } = action.meta.arg;
          console.log(query, page, 'QUERY+PAGE');
          console.log(state, 'STATE');
          if (state.currentUsername === query) {
            state.userProfiles.items = [
              ...state.userProfiles.items,
              ...action.payload.items,
            ];
          } else {
            state.currentUsername = query;
            state.userProfiles.items = action.payload.items;
          }
          state.requests[query] = {
            //data is cahched to the created key which is created while  in pending
            ...state.requests?.[query],
            [page]: {
              status: 'fulfilled',
              items: action.payload.items,
            },
          };
        }
      })

      .addCase(fetchUserProfiles.rejected, (state, action) => {
        if (action.meta?.arg) {
          // will run when the thunk is aborted

          const { query, page } = action.meta?.arg;
          if (state.currentUsername === query) {
            if (state.requests[query]) {
              state.userProfiles.items = [
                ...state.userProfiles.items,
                ...state.requests?.[query]?.[page].items, // data per page is appended
              ];
            }
          } else {
            state.currentUsername = query; // data is present in cache but not the same as the previous request
            state.userProfiles.items = [
              ...state.requests?.[query]?.[page].items,
            ];
          }
        } else {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch user profiles'; // when thunk fails
          state.userProfiles.items = [];
          if (action.payload?.arg) {
            const { query } = action.payload.arg;
            delete state.requests[query]; // since object doesnt exist, delete it
          }
        }
      });
  },
});

export const userRepoSlice = createSlice({
  name: 'userRepoSlice',
  initialState: reposInitialState,
  reducers: {
    changeUserRepositories: (state, action) => {
      state.userRepos.items = action.payload;
      console.log(action.payload, 'PAYLOAD SLICE');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRepos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        if (action.meta?.arg) {
          const { query, page } = action.meta.arg;
          if (state.requests?.[query]) {
            state.requests[query] = {
              ...state.requests?.[query],
              [page]: {
                status: 'pending',
                items: [],
              },
            };
          } else {
            state.requests[query] = {
              [page]: {
                status: 'pending',
                items: [],
              },
            };
          }
        }
      })
      .addCase(fetchUserRepos.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta?.arg) {
          const { query, page } = action.meta.arg;
          console.log(query, page, 'QUERY+PAGE');
          console.log(state, 'STATE');
          if (state.currentUsername === query) {
            state.userRepos.items = [
              ...state.userRepos.items,
              ...action.payload.items,
            ];
          } else {
            state.currentUsername = query;
            state.userRepos.items = action.payload.items;
          }
          state.requests[query] = {
            //data is cahched to the created key which is created while  in pending
            ...state.requests?.[query],
            [page]: {
              status: 'fulfilled',
              items: action.payload.items,
            },
          };
        }
      })

      .addCase(fetchUserRepos.rejected, (state, action) => {
        if (action.meta?.arg) {
          // will run when the thunk is aborted

          // console.log(action.meta.arg, 'ARGS IN REJECTED');
          const { query, page } = action.meta.arg;

          // console.log(query, 'QUERY');

          console.log(state.currentUsername, 'CURRENT NAME');

          if (state.currentUsername === query) {
            if (state.requests[query]) {
              console.log(state.userRepos.items, 'REQS IN REJECTED');

              state.userRepos.items = [
                ...state.userRepos.items,
                ...state.requests?.[query]?.[page].items, // data per page is appended
              ];
            }
          } else {
            state.currentUsername = query; // data is present in cache but not the same as the previous request

            console.log(state.currentUsername, 'current user name');

            // console.log([new Proxy(state.requests, {})], 'QUERY IN REQS ');

            state.userRepos.items = [...state.requests?.[query]?.[page].items];
          }
        } else {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch user profiles'; // when thunk fails
          state.userRepos.items = [];
          if (action.payload?.arg) {
            const { query } = action.payload.arg;
            delete state.requests[query]; // since object doesnt exist, delete it
          }
        }
      });
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

// export const cacheClearSlice = createSlice({
//   name: 'clearCache',
//   initialState: clearCacheInitialState,
//   reducers: {
//     clearUserData: (state) => {
//       // console.log(state.userProfiles.items, 'CLEAR USER PROFILE 1');

//       console.log(state.userProfiles.items, 'items in slice');
//       state.userProfiles.items = [];
//       // console.log(state.userProfiles.items, 'CLEAR USER PROFILE 2');

//       state.userRepos.items = [];
//       // console.log(state.userProfiles.items, 'CLEAR USER PROFILE 3');
//     },
//   },
// });

export const { changeSearchInput } = searchInputSlice.actions;
export const { changeUserProfile } = userProfileSlice.actions;
export const { changeUserRepositories } = userRepoSlice.actions;
// export const { clearUserData } = cacheClearSlice.actions;

const reducers = {
  searchInput: searchInputSlice.reducer,
  profileSlice: userProfileSlice.reducer,
  userRepoSlice: userRepoSlice.reducer,
};

export default reducers;
