import type { IRepository, IUserProfile } from "../../utils/interfaces";

export interface IClearCache {
	userProfiles: {
		items: IUserProfile[];
		total_count: number;
	};

	userRepos: {
		items: IRepository[];
		total_count: number;
	};
}

export interface UserProfileState {
	userProfiles: {
		items: IUserProfile[];
		total_count: number;
	};
	currentUsername: string;
	loading: boolean;
	error: string | null;
	requests: {
		// request is an object for storing cache
		[key: string]: {
			[key1: number]: {
				status: string;
				items: IUserProfile[];
			};
		};
	};
}

export interface ReposInitialState {
	userRepos: {
		items: IRepository[];
		total_count: number;
	};

	currentUsername: string;

	loading: boolean;
	error: string | null;
	requests: {
		[key: string]: {
			[key1: number]: {
				status: string;
				items: IRepository[];
			};
		};
	};
}
