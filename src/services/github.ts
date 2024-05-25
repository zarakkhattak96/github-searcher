import axios from "axios";
import type { FetchUseProfileArgs } from "./types";

export const fetchUser = async ({
  query,
  page,
  perPage,
}: FetchUseProfileArgs) => {
  const url = "https://api.github.com/search/users";

  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        per_page: perPage as number,
        page: page as number,
      },
    });

    if (!response) {
      throw new Error(`Failed to fetch data for user: ${query}`);
    }

    return {
      items: response.data.items,
      total_count: response.data.total_count,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      items: [],
      total_count: 0,
    };
  }
};

export const fetchUserFollowers = async (url: string) => {
  const followers = await axios(url);

  const data = await followers.data;

  return data;
};

export const fetchRepos = async ({
  query,
  perPage,
  page,
}: FetchUseProfileArgs) => {
  try {
    const url = `https://api.github.com/users/${query}/repos`;

    const response = await axios.get(url, {
      params: {
        per_page: perPage,
        page: page,
      },
    });

    if (!response) {
      throw new Error(`Failed to fetch data for user: ${query}`);
    }

    return {
      items: response.data,
      total_count: undefined,
    };
  } catch (error) {
    console.error(error);
    return {
      items: [],
      total_count: 0,
    };
  }
};
