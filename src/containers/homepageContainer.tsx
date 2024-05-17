import { Flex, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  IRepository,
  IUserProfile,
  SelectedOptionType,
} from '../utils/interfaces';
import {
  fetchUserFollowers,
  fetchUserProfile,
  fetchUserRepos,
} from '../services/github';
import { HomePageLayout } from '../app/components/homepage/homepageLayout';
import { ThemeContext } from '../context/themeContext';
import { ThemeProvider } from 'antd-style';
import { useStyle } from '../styles/style';
import { useDebounce } from '../hooks/debounce';
import { useDispatch } from 'react-redux';
import { changeContent } from '../app/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteLoading } from '../hooks/infiniteLoading';

const App = () => {
  const [username, setUsername] = useState('');
  const [userProfiles, setUserProfile] = useState<IUserProfile[]>([]);
  const [userRepositories, setUserRepos] = useState<IRepository[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionType>('user');

  const [isLoading, setIsloading] = useState<boolean>(false);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const { loading, hasMore, loadMore } = useInfiniteLoading(username);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get('q') || '';

  useEffect(() => {
    const newUrl = `${location.pathname}?q=${encodeURIComponent(userName)}`;
    navigate(newUrl);
  }, [userName, navigate, location.pathname]);

  // updating the input value when the username changes
  useEffect(() => {
    userName && setUsername(decodeURI(userName));

    userName && debouncedProfileSearch;

    // userName && debouncedRepos();
  }, [userName]);

  //infinite scrolling

  // useEffect(() => {
  //   const list = document.getElementById('userProf-list');
  //   const handleScroll = (e: Event) => {
  //     const target = e.currentTarget as HTMLElement | null;

  //     if (!target) return;
  //     const bottom =
  //       target.scrollHeight - target.scrollTop === target.clientHeight;

  //     if (bottom && !loading && hasMore) {
  //       loadMore();
  //     }
  //   };

  //   if (list) {
  //     list.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (list) {
  //       list.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, [loading, hasMore]);

  const dispatch = useDispatch();

  const search = async () => {
    if (!username) {
      message.error('Please enter a username');
      return;
    }

    //TODO: to update the fetchUserProfile to axios

    if (selectedOption === 'user') {
      const data = await fetchUserProfile(username);

      if (data.length === 0) {
        message.error('A user with this username does not exist');
        return;
      }

      setUserProfile((userProfile) => {
        const updated = [...userProfile, ...data.items];
        return updated;
      });

      const followersData = await Promise.all(
        data.items.map(async (user) => {
          const followersResponse = await fetchUserFollowers(user.url);
          return { ...user, followers: followersResponse.followers };
        }),
      );

      // await loadItems();

      // const followersData = await fetchUserFollowers(username);

      setUserProfile(() => {
        const updated = followersData.map((userWithFollowers) => ({
          ...userWithFollowers,
          followers: userWithFollowers.followers,
        }));
        return updated;
      });

      setSearchedUsers([...searchedUsers, username]);

      dispatch(changeContent(data));
    } else if (selectedOption === 'repos') {
      searchRepos();
    }

    setIsloading(true);
  };

  const searchRepos = async () => {
    const repos = await fetchUserRepos(username);

    setUserProfile([]);
    setUserRepos(repos);
  };

  // const debouncedRepos = useDebounce(searchRepos, 500);

  const debouncedProfileSearch = useDebounce(() => {
    search();
    setIsloading(true);
  }, 5000);

  // const { items, loadItems, loading } = useInfiniteLoading(getGitHubUsers);

  // useInfiniteLoading();

  const handleChange = (v: SelectedOptionType) => {
    v === 'user' ? setUserRepos([]) : setUserProfile([]);
    (v === 'user' || v === 'repos') && username.length >= 3
      ? setUsername('')
      : setUsername(username);

    setIsloading(false);
    // loadItems();
    // setQuery(username);
    // setPageNumber(1);
  };

  const { styles } = useStyle();

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
          />
        </ThemeContext.Provider>
      </ThemeProvider>
    </Flex>
    // </ConfigProvider>
  );
};

export default App;
