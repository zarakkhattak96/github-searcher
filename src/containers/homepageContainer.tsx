import { Flex, message } from 'antd';

import { useState } from 'react';
import { IRepository, IUserProfile } from '../utils/interfaces';
import {
  fetchUserFollowers,
  fetchUserProfile,
  fetchUserRepos,
} from '../services/github';
import getRandomColor from '../utils/randomColor';
import { HomePageLayout } from '../app/components/homepage/homepageLayout';
import { ThemeContext } from '../context/themeContext';
import { ThemeProvider } from 'antd-style';
import { useStyle } from '../styles/style';
import { useDebounce } from '../hooks/debounce';
import { useDispatch } from 'react-redux';
import { changeContent } from '../app/slice';

const App = () => {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState<IUserProfile[]>([]);
  const [userRepositories, setUserRepos] = useState<IRepository[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState('');

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const dispatch = useDispatch();

  const searchUser = async () => {
    if (!username) {
      message.error('Please enter a username');
      return;
    }

    if (searchedUsers.includes(username)) {
      message.error('This user has already been searched');
    }

    const data = await fetchUserProfile(username);

    if (data?.items.length === 0) {
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
            return { ...profile, background: getRandomColor() };
          });
          return updated;
        });
      } else {
        setUserProfile((prevUserProf) => [
          ...prevUserProf,
          { ...data?.items[0], background: getRandomColor() },
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

    getRandomColor();
    setSearchedUsers([...searchedUsers, username]);

    dispatch(changeContent(data));
  };

  const debouncedProfileSearch = useDebounce(searchUser, 1000);

  const searchRepos = async () => {
    const repos = await fetchUserRepos(username);

    setUserRepos(repos);
  };

  const debouncedRepos = useDebounce(searchRepos, 1000);

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
            debouncedProfile={debouncedProfileSearch}
            userProfile={userProfile}
            userRepositories={userRepositories}
            setExpandedUserRepos={setUserRepos}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
            debouncedRepos={debouncedRepos}
          />
        </ThemeContext.Provider>
      </ThemeProvider>
    </Flex>
    // </ConfigProvider>
  );
};

export default App;
