import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUserProfile } from '../utils/interfaces';
import { store } from '../app/store/store';

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

      console.log('GITHUB FETCH');

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

export const fetchUserRepos = async (
  query: string,
  perPage?: number,
  page?: number,
) => {
  try {
    const repos = await axios.get(
      `https://api.github.com/users/${query}/repos`,
      {
        params: {
          per_page: perPage,
          page: page,
        },
      },
    );

    return {
      items: repos.data,
      total_count: undefined,
    };
  } catch (error) {
    console.error(error);
  }
};
