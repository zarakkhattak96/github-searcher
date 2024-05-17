// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

const fetchUserProfile = async (
  query: string,
  perPage: number,
  page: number,
) => {
  const url = 'https://api.github.com/search/users';

  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        per_page: perPage,
        page: page,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const main = async () => {
  const query = 'zarakk';
  const perPage = 5;
  const page = 1;

  try {
    const data = await fetchUserProfile(query, perPage, page);
    console.log(data, 'FETCHED USERS');
  } catch (error) {
    console.error(error, 'ERROR');
  }
};

main();
