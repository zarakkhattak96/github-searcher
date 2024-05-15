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

const App = () => {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState<IUserProfile[]>([]);
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

  // updating the url when the input value changes
  useEffect(() => {
    const newUrl = `${location.pathname}?q=${encodeURIComponent(userName)}`;
    navigate(newUrl);
  }, [userName, navigate, location.pathname]);

  // updating the input value when the username changes
  useEffect(() => {
    userName && setUsername(decodeURI(userName));

    userName && debouncedProfileSearch(userName);
  }, [userName]);

  const dispatch = useDispatch();

  const searchRepos = async () => {
    const repos = await fetchUserRepos(username);

    setUserProfile([]);
    setUserRepos(repos);
  };

  const debouncedRepos = useDebounce(searchRepos, 3000);

  const search = async () => {
    if (!username) {
      message.error('Please enter a username');
      return;
    }

    if (selectedOption === 'user') {
      const data = await fetchUserProfile(username);

      if (data.length === 0) {
        message.error('A user with this username does not exist');
        return;
      }

      if (data?.items.length > 0) {
        const existingUser = userProfile.findIndex(
          (profile) => profile.id === data.items[0].id,
        );

        if (existingUser !== -1) {
          setUserProfile((prevUserProf) => {
            const updated = [...prevUserProf];
            updated[existingUser] = {
              ...updated[existingUser],
              ...data?.items[0],
            };
            updated.map((profile) => {
              return { ...profile };
            });
            return updated;
          });
        } else {
          setUserProfile((prevUserProf) => [
            ...prevUserProf,
            { ...data?.items[0] },
          ]);
        }
      }

      const followersData = await fetchUserFollowers(username);

      setUserProfile((prevUserProfile) => {
        const updated = prevUserProfile.map((prof) => {
          if (prof.login === username) {
            return { ...prof, followers: followersData };
          }
          return prof;
        });
        return updated;
      });

      setSearchedUsers([...searchedUsers, username]);

      dispatch(changeContent(data));
    } else if (selectedOption === 'repos') {
      debouncedRepos();
    }

    setIsloading(true);
  };

  const debouncedProfileSearch = useDebounce(() => {
    search();
    setIsloading(true);
  }, 3000);

  const handleChange = (v: SelectedOptionType) => {
    v === 'user' ? setUserRepos([]) : setUserProfile([]);
    (v === 'user' || v === 'repos') && username.length >= 3
      ? setUsername('')
      : setUsername(username);

    setIsloading(false);
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
            userProfile={userProfile}
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
