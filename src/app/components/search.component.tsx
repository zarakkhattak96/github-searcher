import { Flex, Input, Select, Typography, Row, Col, Image, Anchor } from 'antd';
import Card from 'antd/es/card/Card';

import { useState } from 'react';
import { debounce } from '../../global/debounce';
import Meta from 'antd/es/card/Meta';
import { IRepository, IUserProfile } from '../../global/interfaces';

const { Title } = Typography;
export default function Search() {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState<IUserProfile[]>([]);
  const [expandedUserRepos, setExpandedUserRepos] = useState<IRepository[]>([]);
  const [isRepoExpanded, setIsRepoExpanded] = useState(false);

  const searchProfile = async () => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`,
    );

    const data = await response?.json();

    if (data.items.length > 0) {
      const existingUser = userProfile.findIndex(
        (profile) => profile.id === data.items[0].id,
      );

      if (existingUser !== -1) {
        setUserProfile((prevUserProf) => {
          const updated = [...prevUserProf];
          updated[existingUser] = {
            ...updated[existingUser],
            ...data.items[0],
          };
          return updated;
        });
      } else {
        setUserProfile((prevUserProf) => [...prevUserProf, data.items[0]]);
      }
    }
    await fetchUserFollowers();
    await fetchUserRepos(username);
    // await setUserRepos(userRepos);
    // await fetchUserRepos();
  };

  const fetchUserRepos = async (username: string) => {
    const repos = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await repos.json();
    return data;

    // setUserRepos(data);
  };

  const toggleReposCard = async (username: string) => {
    setIsRepoExpanded((prevState) => !prevState);

    if (!isRepoExpanded) {
      const repos = await fetchUserRepos(username);
      setExpandedUserRepos(repos);
    }

    // const repos = await fetchUserRepos(username);
    // setExpandedUserRepos(repos);
  };

  const fetchUserFollowers = async () => {
    const followers = await fetch(
      `https://api.github.com/users/${username}/followers`,
    );

    const data = await followers.json();

    setUserProfile((prevUserProfile) => {
      const updated = prevUserProfile.map((prof) => {
        if (prof.login === username) {
          return { ...prof, followers: data };
        }
        return prof;
      });
      return updated;
    });
  };

  const debouncedProfileSearch = debounce(searchProfile, 1000);

  return (
    <>
      <div>
        <Flex vertical gap='middle' wrap='wrap'>
          <Input
            placeholder='Start typing here ..'
            maxLength={50}
            size='large'
            type='text'
            style={{
              borderRadius: '0',
              height: 'auto',
              width: '100%',
              maxWidth: '500px',
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Select
            placeholder='User'
            options={[{ value: 'user', label: 'User' }]}
            style={{
              width: '30%',
              height: 'auto',
            }}
            size='large'
            onClick={debouncedProfileSearch}
          />

          <Row gutter={[96, 6]}>
            {userProfile?.map((profile, index) => (
              <Col key={index} span={8}>
                {userProfile[0].login !== undefined && (
                  <Card
                    onClick={() => toggleReposCard(profile.login)}
                    hoverable
                    style={{ width: 240 }}
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

          {!isRepoExpanded ? null : (
            <Row gutter={[96, 6]}>
              {expandedUserRepos?.map((repo, index) => (
                <Col key={index} span={8}>
                  {repo.name !== undefined && (
                    <Card hoverable style={{ width: 240 }}>
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
      </div>
    </>
  );
}
