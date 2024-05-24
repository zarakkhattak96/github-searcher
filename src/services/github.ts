import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IRepository, IUserProfile } from '../utils/interfaces';
// import fetchFromCache, { USER_CACHE } from '../utils/ttlCache';

export interface FetchUseProfileArgs {
  query: string;
  perPage?: number;
  page?: number;
}

export interface IUserResponse {
  items: IUserProfile[];
  total_count: number;
  requests: {
    [key: string]: {
      status: string;
      items: IUserProfile[];
      total_count: number;
    };
  };
}

export interface IReposResponse {
  items: IRepository[];
  total_count: number;
  requests: {
    [key: string]: {
      status: string;
      items: IRepository[];
      total_count: number;
    };
  };
}

export interface FetchReposArgs {
  query: string;
  perPage?: number;
  page?: number;
}

// type  ThunkApi = ReturnType< typeof >

export const fetchUserProfiles = createAsyncThunk<
  IUserResponse,
  FetchUseProfileArgs
>(
  'profile/fetchUserProfiles',

  async ({ query, perPage, page }, thunkApi: any) => {
    const url = 'https://api.github.com/search/users';

    console.log(query, 'QUERY FROM GITHUB');

    try {
      const response = await axios.get(url, {
        params: {
          q: query,
          per_page: perPage as number,
          page: page as number,
        },
      });

      return {
        items: response.data.items,
        total_count: response.data.total_count,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return thunkApi.rejectWithValue({
        items: [],
        total_count: 0,
      });
    }
  },
  {
    condition: ({ query, page }: FetchUseProfileArgs, { getState }) => {
      const { profile } = getState();
      const statusKey = profile.requests?.[query]?.[page];
      console.log(statusKey, 'STATUS IN THUNK');
      if (
        statusKey &&
        (statusKey.status === 'fulfilled' || statusKey.status === 'loading')
      ) {
        console.log('ALREADY FETCHED');
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
      return true;
    },
    dispatchConditionRejection: true,
  },
);

export const fetchUserFollowers = async (url: string) => {
  const followers = await axios(url);

  const data = await followers.data;

  return data;
};

export const fetchUserRepos = createAsyncThunk<IReposResponse, FetchReposArgs>(
  'profile/fetchUserRepos',

  async ({ query, perPage, page }, thunkApi: any) => {
    const url = `https://api.github.com/users/${query}/repos`;
    try {
      const repos = await axios.get(url, {
        params: {
          per_page: perPage,
          page: page,
        },
      });

      console.log(repos, 'GITHUB FETCH');

      return {
        items: repos.data,
        total_count: undefined,
      };
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue({
        items: [],
        total_count: 0,
      });
    }
  },
  {
    condition: ({ query, page }: FetchUseProfileArgs, { getState }) => {
      const { repos } = getState();

      console.log(repos, 'REPOS IN SERV');

      const statusKey = repos.requests?.[query]?.[page];

      if (repos.request) {
        const fetch = fetchFromCache(USER_CACHE);
        console.log(fetch, 'FETCH FROM CACHE');
      }

      if (
        statusKey &&
        (statusKey.status === 'fulfilled' || statusKey.status === 'loading')
      ) {
        console.log('ALREADY FETCHED');
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
      return true;
    },
    dispatchConditionRejection: true,
  },
);
