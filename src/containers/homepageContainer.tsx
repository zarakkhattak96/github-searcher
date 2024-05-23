import { Flex, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  IRepository,
  IUserProfile,
  SelectedOptionType,
} from '../utils/interfaces';
import {
  FetchUseProfileArgs,
  fetchUserProfiles,
  fetchUserRepos,
} from '../services/github';
import { HomePageLayout } from '../app/components/homepage/homepageLayout';
import { ThemeContext } from '../context/themeContext';
import { ThemeProvider } from 'antd-style';
import { useStyle } from '../styles/style';
import { useDispatch, useSelector } from 'react-redux';
// import { changeUserRepositories } from '../app/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/debounce';
import { AppDispatch, RootState } from '../app/store/store';

const App = () => {
  const paginationInitialValues = {
    page: 1,
    per_page: 20,
    total_count: 0,
  };

  const [pagination, setPagination] = useState(paginationInitialValues);
  const [username, setUsername] = useState('');
  const [page, setPage] = useState(1);
  const [userProfiles, setUserProfile] = useState<IUserProfile[]>([]);
  const [userRepositories, setUserRepos] = useState<IRepository[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionType>('user');
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const userName = queryParams.get('q') || '';
  const { styles } = useStyle();

  const dispatch = useDispatch();

  const userProfileState = useSelector((state: RootState) => state.profile);
  const reposState = useSelector((state: RootState) => state.repos);

  const fetchProfileData = async ({
    query,
    perPage,
    page,
  }: FetchUseProfileArgs) => {
    try {
      const resultAction = dispatch<AppDispatch | any>(
        fetchUserProfiles({
          query: query,
          perPage,
          page,
        }),
      );

      if (fetchUserProfiles.fulfilled.match(resultAction)) {
        const user = resultAction;

        setIsloading(false);

        return user;
      } else if (fetchUserProfiles.rejected.match(resultAction)) {
        setIsloading(true);

        message.error('Cannot fetch User Profile');
        return;
      } else {
        setIsloading(true);
      }

      return await resultAction;
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsloading(false);
    }
  };

  const fetchReposData = async (
    query: string,
    perPage?: number,
    page?: number,
  ) => {
    try {
      const resultAction = dispatch<AppDispatch | any>(
        fetchUserRepos({ query, perPage, page }),
      );

      if (fetchUserRepos.fulfilled.match(resultAction)) {
        const repos = resultAction;

        setIsloading(false);

        return repos;
      } else if (fetchUserRepos.rejected.match(resultAction)) {
        setIsloading(true);

        message.error('Cannot fetch repos');
        return;
      } else {
        setIsloading(true);
      }

      console.log(await resultAction, 'ACTION');
      setIsloading(true);

      // const result = await fetchUserRepos(query, perPage, page);

      setIsloading(false);

      return await resultAction;

      // return result;
    } catch (error) {
      console.error('Error fetching data:', error);

      setIsloading(false);
    }
  };

  const search = async () => {
    if (username.length === 0 || username.length < 3) {
      setIsloading(false);

      return;
    }

    setIsloading(true);

    if (selectedOption === 'user') {
      await fetchProfileData({
        query: username,
        perPage: pagination.per_page,
        page: pagination.page,
      });

      const result = userProfileState.userProfiles;

      console.log(result, 'RESULT11');

      if (result) {
        const items = result.items;
        setUserProfile(items);
        // const items = await result.payload.items;

        console.log(items, 'PAYYYYYYYYY11111');

        const total_count = result.total_count;

        setPagination((pagination) => ({ ...pagination, total_count }));

        // TODO: to fix the fetch followers response

        // const items = result.items;

        // console.log(items, 'ITEMS BEFORE FOLLOWERS');
        // const followersData = await Promise.all(
        //   items.map(async (user: IUserProfile) => {
        //     return { ...user };
        //   }),
        // );

        // setUserProfile([
        //   ...followersData,
        //   ...userProfileState.userProfiles.items,
        // ]);

        // setUserProfile((prevUserProfiles) => {
        //   const updatedProfiles = followersData.map(
        //     (userWithFollowers: IUserProfile) => ({
        //       ...userWithFollowers,
        //       followers: userWithFollowers.followers,
        //     }),
        //   );

        //   return [...prevUserProfiles, ...updatedProfiles];
        // });
        // dispatch(changeUserProfile(items));
        // setSearchedUsers([...searchedUsers, username]);
        // reposState.userRepos.items = [];
      }
    } else if (selectedOption === 'repos') {
      await fetchReposData(username, pagination.per_page, pagination.page);

      console.log(await reposState, 'REPO RESULT SEARCH');

      if (reposState && reposState.userRepos.items.length > 0) {
        setUserRepos((prevUserRepos) => [
          ...prevUserRepos,
          ...reposState.userRepos.items,
        ]);

        setPagination((pagination) => ({ ...pagination }));

        // dispatch(changeUserRepositories(reposState.userRepos.items)); //persisting repos data in redux
        setIsloading(false);
      } else if (reposState.userRepos.items.length === 0) {
        setPagination((pagination) => ({
          ...pagination,
          total_count: userRepositories.length,
        }));
      }

      setUserProfile([]);
    }
  };

  const debouncedProfileSearch = useDebounce((val: string) => {
    search();
    setUsername(val);
  }, 1000);

  const handleChange = (v: SelectedOptionType) => {
    v === 'user' ? setUserRepos([]) : setUserProfile([]);

    if (username.length <= 3) {
      setUsername('');
    }

    setPagination(paginationInitialValues);
    setIsloading(false);
  };

  const handleScroll = () => {
    setPagination((pagination) => ({
      ...pagination,
      page: pagination.page + 1,
    }));
    setPage((page) => page + 1);
  };

  const conditionForBottomScroll =
    (pagination.total_count !== userProfileState.userProfiles.items.length &&
      userProfiles.length !== 0) ||
    (pagination.total_count !== reposState.userRepos.items.length &&
      reposState.userRepos.items.length !== 0);

  useEffect(() => {
    debouncedProfileSearch(username);
  }, [username, pagination.page]);

  useEffect(() => {}, [pagination]);

  useEffect(() => {
    const newUrl = `${location.pathname}?q=${encodeURIComponent(userName)}`;
    navigate(newUrl);
  }, [userName, navigate, location.pathname]);

  useEffect(() => {
    userName && setUsername(decodeURI(userName));
  }, [userName]);

  return (
    <Flex id='homeContainer' className={styles.flexHeight}>
      <ThemeProvider appearance={theme}>
        <ThemeContext.Provider
          value={{
            changeTheme: () => {
              setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
            },
          }}
        >
          <HomePageLayout
            username={username}
            setUsername={setUsername}
            userProfile={userProfileState.userProfiles.items}
            userRepositories={reposState.userRepos.items}
            setExpandedUserRepos={setUserRepos}
            handleChange={handleChange}
            handleInputChange={debouncedProfileSearch}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isLoading={isLoading}
            setIsLoading={setIsloading}
            handleScroll={handleScroll}
            conditionForBottomScroll={conditionForBottomScroll}
            setPage={setPage}
            page={page}
          />
        </ThemeContext.Provider>
      </ThemeProvider>
    </Flex>
  );
};

export default App;
