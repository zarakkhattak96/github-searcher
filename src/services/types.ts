import type { IRepository, IUserProfile } from "../utils/interfaces";

export interface FetchUseProfileArgs {
	query: string;
	perPage?: number;
	page?: number;
}

export interface IUserResponse {
	items: IUserProfile[];
	total_count: number;
}

export interface IReposResponse {
	items: IRepository[];
	total_count: number | undefined;
}

export interface FetchReposArgs {
	query: string;
	perPage?: number;
	page?: number;
}
