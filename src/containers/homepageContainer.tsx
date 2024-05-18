import { Flex } from 'antd';
import { useCallback, useEffect, useState } from 'react';
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
    per_page: 5,
    total_count: 0,
  };

  const [pagination, setPagination] = useState(paginationInitialValues);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  const [userProfiles, setUserProfile] = useState<IUserProfile[]>([]);
  const [totalCount, setTotalCount] = useState(0);
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
  const fetchData = async (query: string, perPage?: number, page?: number) => {
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

  const search = useCallback(async () => {
    if (username.length === 0) {
      console.log('Please enter a username');
      return;
    }
    const result = await fetchData(
      username,
      pagination.per_page,
      pagination.page,
    );

    const { items, total_count } = result as unknown;
    setTotalCount(total_count);
    if (selectedOption === 'user') {
      setUserProfile((userProfile) => {
        const updated = [...userProfile, ...items];
        return updated;
      });

      const followersData = await Promise.all(
        items.map(async (user: IUserProfile) => {
          // const followersResponse = await fetchUserFollowers(user.url);
          // return { ...user, followers: followersResponse.followers };
          return { ...user };
        }),
      );

      setUserProfile(() => {
        const updated = followersData.map((userWithFollowers) => ({
          ...userWithFollowers,
          followers: userWithFollowers.followers,
        }));
        return updated;
      });

      setSearchedUsers([...searchedUsers, username]);

      dispatch(changeContent(items));
    } else if (selectedOption === 'repos') {
      searchRepos();
    }

    setIsloading(true);
  }, [username]);

  const searchRepos = async () => {
    const repos = await fetchUserRepos(username);

    setUserProfile([]);
    setUserRepos(repos);
  };

  const debouncedProfileSearch = useDebounce((val: string) => {
    setUsername(val);
  }, 1000);

  const handleChange = (v: SelectedOptionType) => {
    v === 'user' ? setUserRepos([]) : setUserProfile([]);

    if (username.length <= 3) {
      setInputText('');
      setUsername('');
    }

    setIsloading(false);
  };

  const handleScroll = () => {
    console.log('handleScroll');
  };

  // const conditionForBottomScroll = () => {
  //   console.log(pagination.total_count, 'asdasdasd');
  //   return pagination.total_count >= 0;
  // };

  // useEffect(() => {
  //   console.log(pagination.total_count);
  // }, []);

  useEffect(() => {
    search();
    // setPagination({ ...pagination, total_count: total_count });
    // console.log(totalCount);
  }, [search]);

  useEffect(() => {
    const newUrl = `${location.pathname}?q=${encodeURIComponent(userName)}`;
    navigate(newUrl);
  }, [userName, navigate, location.pathname]);

  useEffect(() => {
    userName && setUsername(decodeURI(userName));
  }, [userName]);

  return (
    // <ConfigProvider theme={darkTheme}>
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
            conditionForBottomScroll={totalCount}
          />
        </ThemeContext.Provider>
      </ThemeProvider>
    </Flex>
    // </ConfigProvider>
  );
};

export default App;
