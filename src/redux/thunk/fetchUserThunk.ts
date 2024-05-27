import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../../services/github";
import type { FetchUseProfileArgs, IUserResponse } from "../../services/types";

export const fetchUserProfiles = createAsyncThunk<
	IUserResponse,
	FetchUseProfileArgs
>(
	"profile/fetchUserProfiles",

	async ({ query, page, perPage }) => {
		const userProfiles = await fetchUser({ query, page, perPage });
		return userProfiles;
	},
	{
		condition: ({ query, page }: FetchUseProfileArgs, thunkAPI) => {
			const { profile } = thunkAPI.getState();

			const statusKey = profile.requests?.[query]?.[page];

			if (
				statusKey &&
				(statusKey.status === "fulfilled" || statusKey.status === "loading")
			) {
				return false;
			}
			return true;
		},
		dispatchConditionRejection: true,
	},
);
