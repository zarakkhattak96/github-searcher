import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from '../../services/github';
import { IUserProfile } from '../../utils/interfaces';
import { FetchUseProfileArgs } from '../../services/types';

export const fetchUserProfiles = createAsyncThunk<
  IUserProfile,
  FetchUseProfileArgs
>(
  'profile/fetchUserProfiles',

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ query, page, perPage }, thunkApi: any) => {
    console.log(query, perPage, page, 'THUNK PROPS');
    const dispatchPRof = thunkApi.dispatch(
      await fetchUser({ query, page, perPage }),
    );

    const userState = thunkApi.getState().profile;

    console.log(dispatchPRof, 'PROF');

    console.log(userState, 'USER STATE');
    return userState;
  },
  {
    condition: ({ query, page }: FetchUseProfileArgs, { getState }) => {
      const { profile } = getState();

      const statusKey = profile.requests?.[query]?.[page];

      //   console.log(statusKey, 'STATUS IN THUNK');
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
