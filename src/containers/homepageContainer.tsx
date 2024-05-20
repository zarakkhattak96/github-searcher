import { Flex } from 'antd';
import { useEffect, useState } from 'react';
import {
  IRepository,
  IUserProfile,
  SelectedOptionType,
} from '../utils/interfaces';
import { fetchUserProfiles, fetchUserRepos } from '../services/github';
import { HomePageLayout } from '../app/components/homepage/homepageLayout';
import { ThemeContext } from '../context/themeContext';
import { ThemeProvider } from 'antd-style';
import { useStyle } from '../styles/style';
import { useDispatch } from 'react-redux';
import { changeContent } from '../app/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/debounce';

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
  const [searchedUsers, setSearchedUsers] = useState<string[]>([]);
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
  const fetchProfileData = async (
    query: string,
    perPage?: number,
    page?: number,
  ) => {
    try {
      setIsloading(true);
      const result = await fetchUserProfiles(query, perPage, page);
      setIsloading(false);
      return result;
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
      setIsloading(true);

      const result = await fetchUserRepos(query, perPage, page);

      setIsloading(false);

      return result;
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
      const result = await fetchProfileData(
        username,
        pagination.per_page,
        pagination.page,
      );

      const { items, total_count } = result as {
        items: IUserProfile[];
        total_count: number;
      };

      setPagination((pagination) => ({ ...pagination, total_count }));

      const followersData = await Promise.all(
        items.map(async (user: IUserProfile) => {
          return { ...user };
        }),
      );

      setUserProfile((prevUserProfiles) => {
        const updatedProfiles = followersData.map((userWithFollowers) => ({
          ...userWithFollowers,
          followers: userWithFollowers.followers,
        }));

        return [...prevUserProfiles, ...updatedProfiles];
      });

      setSearchedUsers([...searchedUsers, username]);

      dispatch(changeContent(items));
    } else if (selectedOption === 'repos') {
      const reposResult = await fetchReposData(
        username,
        pagination.per_page,
        pagination.page,
      );

      if (reposResult && reposResult.items.length > 0) {
        setUserRepos((prevUserRepos) => [
          ...prevUserRepos,
          ...reposResult.items,
        ]);
        setPagination((pagination) => ({ ...pagination }));

        dispatch(changeContent(reposResult)); //persisting repos data in redux
        setIsloading(false);
      } else if (reposResult?.items.length === 0) {
        setPagination((pagination) => ({
          ...pagination,
          total_count: userRepositories.length,
        }));
      }
    }
  };

  const debouncedProfileSearch = useDebounce((val: string) => {
    search();
    setUsername(val);
  }, 3000);

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
    (pagination.total_count !== userProfiles.length &&
      userProfiles.length !== 0) ||
    (pagination.total_count !== userRepositories.length &&
      userRepositories.length !== 0);

  useEffect(() => {
    debouncedProfileSearch(username);
  }, [username, page]);

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
            userProfile={userProfiles}
            userRepositories={userRepositories}
            setExpandedUserRepos={setUserRepos}
            handleChange={handleChange}
            handleInputChange={debouncedProfileSearch}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isLoading={isLoading}
            setIsLoading={setIsloading}
            handleScroll={handleScroll}
            conditionForBottomScroll={conditionForBottomScroll}
            page={page}
          />
        </ThemeContext.Provider>
      </ThemeProvider>
    </Flex>
  );
};

export default App;
