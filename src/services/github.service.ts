export const fetchUserProfile = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${username}`,
  );

  const data = await response.json();

  if (!data) {
    throw new Error('Data does not exist');
  }

  return data;
};

export const fetchUserFollowers = async (username: string) => {
  const followers = await fetch(
    `https://api.github.com/users/${username}/followers`,
  );

  const data = await followers.json();

  return data;
};

export const fetchUserRepos = async (username: string) => {
  const repos = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await repos.json();
  return data;
};
