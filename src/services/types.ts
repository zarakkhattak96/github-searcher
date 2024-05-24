import { IRepository, IUserProfile } from '../utils/interfaces';

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
