import axios from 'axios';

export const fetchUserProfiles = async (
  query: string,
  perPage?: number,
  page?: number,
) => {
  const url = 'https://api.github.com/search/users';

  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        per_page: perPage as number,
        page: page as number,
      },
    });

    return {
      items: response.data.items,
      total_count: response.data.total_count,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserFollowers = async (url: string) => {
  const followers = await fetch(url);

  const data = await followers.json();

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
          q: query,
          per_page: perPage,
          page: page,
        },
      },
    );

    return repos.data;
  } catch (error) {
    console.error(error);
  }
};
