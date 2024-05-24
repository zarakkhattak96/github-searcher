// import { fetchUserRepos } from '../services/github';

// import fetchFromCache from "../utils/ttlCache";

// import { fetchFromCache } from '../utils/ttlCache';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const axios = require('axios');
// import { fetchFromCache } from '../utils/ttlCache';

// const fetchUserProfile = async (
//   query: string,
//   perPage: number,
//   page: number,
// ) => {
//   const url = 'https://api.github.com/search/users';

//   try {
//     const response = await axios.get(url, {
//       params: {
//         q: query,
//         per_page: perPage,
//         page: page,
//       },
//     });

//     return response.data.items;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };

// const fetchUserRepos = async (
//   query: string,
//   perPage?: number,
//   page?: number,
// ) => {
//   const url = 'https://api.github.com/search/users';

//   const response = axios.get(url, {
//     params: {
//       q: query,
//       per_page: perPage as number,
//       page: page as number,
//     },
//   });

//   const data = (await response).data;

//   console.log(data);

//   return data;
// };

const main = async () => {
  // const perPage = 10;
  // const page = 1;
  const username = 'userData';
  try {
    const fetch = localStorage.getItem(username);
    console.log(fetch, 'FETCH FROM CACHE');
  } catch (error) {
    console.error(error);
  }
};

main();
