import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../../services/github";
import type { IUserProfile } from "../../utils/interfaces";
import type { FetchUseProfileArgs } from "../../services/types";

export const fetchUserProfiles = createAsyncThunk<
	IUserProfile,
	FetchUseProfileArgs
>(
	"profile/fetchUserProfiles",

	async ({ query, page, perPage }) => {
		const userProfiles = fetchUser({ query, page, perPage });
		return userProfiles;
	},
	{
		condition: ({ query, page }: FetchUseProfileArgs, { getState }) => {
			const { profile } = getState();

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
