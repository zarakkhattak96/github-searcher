import axios from 'axios';

// export const fetchUserProfile = async (username: string) => {
//   const response = await fetch(
//     `https://api.github.com/search/users?q=${username}`,
//   );

//   const data = await response.json();

//   if (!data) {
//     throw new Error('Data does not exist');
//   }

//   return data;
// };

export const fetchUserProfiles = async (
  query: string,
  perPage?: number,
  page?: number,
) => {
  const url = 'https://api.github.com/search/users';

  // console.log(query, 'QUERY');

  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        per_page: perPage as number,
        page: page as number,
      },
    });

    // console.log(response, "RESP")

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

export const fetchUserRepos = async (username: string) => {
  const repos = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await repos.json();
  return data;
};

// export const getGitHubUsers = async (page: number, query: string) => {
//   const response = await fetchUserProfile(query);
//   return response.items;
// };
// export const getItems = async (
//   page: number,
//   username: string,
// ): Promise<{ items: IUserProfile[]; total_count: number }> => {
//   const response = await fetch(`https://api.github.com/users/${username}`);

//   const data = await response.json();

//   console.log(data, 'DATA for Infinite');

//   return data;
// };
