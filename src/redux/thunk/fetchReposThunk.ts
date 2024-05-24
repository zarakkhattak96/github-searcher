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

			console.log(repos, "REPOS IN SERV");

			const statusKey = repos.requests?.[query]?.[page];

			if (
				statusKey &&
				(statusKey.status === "fulfilled" || statusKey.status === "loading")
			) {
				console.log("ALREADY FETCHED");
				// Already fetched or in progress, don't need to re-fetch
				return false;
			}
			return true;
		},
		dispatchConditionRejection: true,
	},
);
