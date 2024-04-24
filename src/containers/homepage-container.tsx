import { message } from 'antd';

import { useState } from 'react';
import { debounce } from '../utils/debounce.utils';
import { IRepository, IUserProfile } from '../utils/interfaces.utils';
import {
  fetchUserFollowers,
  fetchUserProfile,
  fetchUserRepos,
} from '../services/github.service';
import getRandomColor from '../utils/randomColor.util';
import { HomePageComponent } from '../app/components/homepage/homepage.component';
import { useStyle } from '../styles/style';

const HomePageContainer = () => {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState<IUserProfile[]>([]);
  const [expandedUserRepos, setExpandedUserRepos] = useState<IRepository[]>([]);
  const [isRepoExpanded, setIsRepoExpanded] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState('');

  const searchUser = async () => {
    const data = await fetchUserProfile(username);

    if (searchedUsers.includes(username)) {
      message.error('This user has already been searched');
    }

    if (data?.items.length === 0) {
      message.error('A user with this username does not exist');
      return;
    }

    if (data?.items.length > 0) {
      const existingUser = userProfile.findIndex(
        (profile) => profile.id === data.items[0].id,
      );

      if (existingUser !== -1) {
        console.log(existingUser, 'EXISTING USER');
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

    await fetchUserRepos(username);

    getRandomColor();
    setSearchedUsers([...searchedUsers, username]);
  };

  const debouncedProfileSearch = debounce(searchUser, 1000);
  const { styles } = useStyle();

  return (
    // <div className={styles.root}>
    <HomePageComponent
      username={username}
      setUsername={setUsername}
      debouncedProfile={debouncedProfileSearch}
      userProfile={userProfile}
      isRepoExpanded={isRepoExpanded}
      setIsRepoExpanded={setIsRepoExpanded}
      expandedUserRepos={expandedUserRepos}
      setExpandedUserRepos={setExpandedUserRepos}
      activeColor={activeColor}
      setActiveColor={setActiveColor}
    />
    // </div>
  );
};

export default HomePageContainer;
