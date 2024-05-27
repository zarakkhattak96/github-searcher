import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
	FetchReposArgs,
	FetchUseProfileArgs,
	IReposResponse,
} from "../../services/types";
import { fetchRepos } from "../../services/github";

export const fetchUserRepos = createAsyncThunk<IReposResponse, FetchReposArgs>(
	"profile/setUserRepos",

	async ({ query, perPage, page }) => {
		const userRepos = await fetchRepos({ query, perPage, page });
		return userRepos;
	},

	{
		condition: ({ query, page }: FetchUseProfileArgs, { getState }) => {
			const { repos } = getState();

			const statusKey = repos.requests?.[query]?.[page];

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
