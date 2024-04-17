import { Flex, Input, Select, Typography, Row, Col, Image, Anchor } from 'antd';
// import type { TabsProps } from 'antd';
import Card from 'antd/es/card/Card';

import { useState } from 'react';
import { debounce } from '../../global/debounce';
import Meta from 'antd/es/card/Meta';
import { IUserProfile } from '../../global/interfaces';

const { Title } = Typography;
export default function Search() {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState<IUserProfile[]>([]);

  // const [userFollowers, setUserFollowers] = useState([]);
  // const [userRepos, setUserRepos] = useState([]);

  // const items: TabsProps['items'] = [
  //   {
  //     key: 'followers',
  //     label: 'Followers',
  //     children: (
  //       <div>
  //         {userFollowers.map((follower) => (
  //           <div key={follower.id}>{follower.login}</div>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   {
  //     key: 'repos',
  //     label: 'Repositories',
  //     children: (
  //       <div>
  //         {userRepos.map((repo) => (
  //           <div key={repo.id}>{repo.name}</div>
  //         ))}
  //       </div>
  //     ),
  //   },
  // ];

  // const [selectedTab, setSelectedTab] = useState('followers');

  const searchProfile = async () => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`,
    );

    const data = await response?.json();

    if (data.items.length > 0) {
      const existingUser = userProfile.findIndex(
        (profile) => profile.id === data.items[0].id,
      );
      // setUserProfile([...userProfile, data.items[0]]);

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
    // setUserProfile(data.items[0]);
    await fetchUserFollowers();
    // await fetchUserRepos();
  };

  const fetchUserFollowers = async () => {
    const followers = await fetch(
      `https://api.github.com/users/${username}/followers`,
    );

    const data = await followers.json();

    // setUserFollowers();

    setUserProfile((prevUserProfile) => {
      const updated = prevUserProfile.map((prof) => {
        if (prof.login === username) {
          return { ...prof, followers: data };
        }
        return prof;
      });
      return updated;
      // const updatedUserProf = [...prevUserProfile];
      // updatedUserProf[0] = { ...updatedUserProf[0], followers: data };

      // console.log(updatedUserProf, 'UPDATED');

      // console.log(updatedUserProf, 'Updated');
      // return updatedUserProf;
    });
  };

  // console.log(userProfile, 'USERPROFILE');

  // const fetchUserRepos = async () => {
  //   const repos = await fetch(`https://api.github.com/users/${username}/repos`);

  //   const data = await repos.json();

  //   // await setUserRepos(data);
  // };

  // const handleTabChange = async (key: string) => {
  //   setSelectedTab(key);

  //   if (key === '1') {
  //     await fetchUserFollowers(userProfile.followers_url);
  //   } else if (key === '2') {
  //     await fetchUserRepos(userProfile.repos_url);
  //   }
  // };

  const debouncedProfileSearch = debounce(searchProfile, 1000);

  // if (userProfile.length === 0) {
  //   console.log('USER PROFILE IS UNDEFINED');
  // }

  // console.log(userProfile[0].followers, 'hahaha');
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
              // left: '380px',
              // bottom: '55px',
            }}
            size='large'
            onClick={debouncedProfileSearch}
          />

          <Row gutter={[96, 6]}>
            {userProfile?.map((profile, index) => (
              <Col key={index} span={8}>
                {userProfile[0].login !== undefined && (
                  <Card
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
        </Flex>
      </div>

      {/* <Flex vertical gap='middle'>
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
            width: '40%',
            height: 'auto',
            left: '380px',
            bottom: '56px',
          }}
          size='large'
          onChange={debouncedProfileSearch}
        />
      </Flex>

      <Row gutter={[16, 16]}>
        {userProfile.login !== undefined && (
          <Col span={24}>
            <Card
              hoverable
              style={{ marginTop: '20px', maxWidth: '400px', height: 'auto' }}
            >
              <div>
                <Space direction='vertical' size={16}>
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    src={userProfile?.avatar_url}
                    alt='User Profile'
                    style={{
                      marginTop: '10px',
                      marginBottom: '10px',
                      height: '150px',
                      width: '150px',
                    }}
                  />
                  <Title level={4}>{userProfile?.login}</Title>
                </Space>

                <>
                  <Tabs
                    activeKey={selectedTab}
                    onChange={handleTabChange}
                    destroyInactiveTabPane={true}
                    onTabClick={(key) => handleTabChange(key)}
                    items={items}
                  >
                    <Tabs.TabPane tab='Followers' key='1' />

                    <Tabs.TabPane tab='Repositories' key='2' />
                  </Tabs>
                </>
              </div>
            </Card>
          </Col>
        )}
      </Row> */}
    </>
  );
}
