import {
  Flex,
  Input,
  Select,
  Typography,
  Row,
  Col,
  Image,
  Anchor,
  Space,
  message,
} from 'antd';
import Card from 'antd/es/card/Card';

import { useState } from 'react';
import { debounce } from '../utils/debounce.utils';
import Meta from 'antd/es/card/Meta';
import { IRepository, IUserProfile } from '../utils/interfaces.utils';
import {
  fetchUserFollowers,
  fetchUserProfile,
} from '../services/github.service';

const { Title } = Typography;
export default function Search() {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState<IUserProfile[]>([]);
  const [expandedUserRepos, setExpandedUserRepos] = useState<IRepository[]>([]);
  const [isRepoExpanded, setIsRepoExpanded] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState<string[]>([]);

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

    // await fetchUserFollowers();
    await fetchUserRepos(username);
    getRandomColor();
    setSearchedUsers([...searchedUsers, username]);
  };

  const fetchUserRepos = async (username: string) => {
    const repos = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await repos.json();
    return data;
  };

  const [activeColor, setActiveColor] = useState('');

  const toggleReposCard = async (username: string) => {
    setIsRepoExpanded((prevState) => !prevState);

    if (!isRepoExpanded) {
      const repos = await fetchUserRepos(username);
      setExpandedUserRepos(repos);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';

    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const debouncedProfileSearch = debounce(searchUser, 1000);

  return (
    <Flex vertical gap='middle' wrap='wrap'>
      <Space align='center' direction='horizontal'>
        <Input
          placeholder='Start typing here ..'
          maxLength={50}
          size='large'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Select
          placeholder='User'
          options={[{ value: 'user', label: 'User' }]}
          size='large'
          onClick={debouncedProfileSearch}
          // listHeight={128}
        />
      </Space>

      {userProfile.length > 0 && (
        <Row gutter={[182, 8]}>
          {userProfile?.map((profile, index) => (
            <Col key={index} span={8}>
              {profile.login !== undefined && (
                <Card
                  onClick={() => {
                    toggleReposCard(profile.login);
                    setActiveColor(profile.background as string);
                  }}
                  hoverable
                  style={{
                    width: 240,
                    backgroundColor: profile.background,
                  }}
                  cover={<Image alt='user dp' src={profile.avatar_url} />}
                >
                  <Meta
                    title={profile.login}
                    description={
                      <Anchor
                        items={[
                          {
                            key: 'profile_url',
                            href: profile.html_url,
                            title: profile.login,
                          },
                        ]}
                      />
                    }
                  />

                  <div>
                    <Title level={5}>
                      Followers: {profile?.followers?.length ?? 0}
                    </Title>
                  </div>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      )}

      {!isRepoExpanded ? null : (
        <Row gutter={[182, 16]}>
          {expandedUserRepos?.map((repo, index) => (
            <Col key={index} span={8}>
              {repo.name !== undefined && (
                <Card
                  hoverable
                  style={{
                    width: 240,
                    background: activeColor,
                  }}
                >
                  <Meta
                    title={repo.name}
                    description={
                      <Anchor
                        items={[
                          {
                            key: 'profile_url',
                            href: repo.html_url,
                            title: repo.name,
                          },
                        ]}
                      />
                    }
                  />
                  <div>
                    <Title level={5}>Stars: {repo.stargazers_count}</Title>
                  </div>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      )}
    </Flex>
  );
}
