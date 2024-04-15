// import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import {
  Flex,
  Input,
  Row,
  Select,
  Spin,
  Avatar,
  Space,
  Typography,
  Segmented,
  Tabs,
} from 'antd';
import type { TabsProps } from 'antd';
import Card from 'antd/es/card/Card';

import { useState } from 'react';

const { Title } = Typography;
export default function Search() {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState({});

  const [userFollowers, setUserFollowers] = useState('');
  const [userRepos, setUserRepos] = useState('');

  const [selectedTab, setSelectedTab] = useState(0);

  const searchProfile = async () => {
    const response = await fetch(
      'https://api.github.com/search/users?q=zarakkhattak96',
    );

    const data = await response?.json();

    console.log(data, 'Data');

    setUserProfile(data.items[0]);
    fetchUserFollowers();
    fetchUserRepos();
  };

  const items: TabsProps['items'] = [
    { key: '1', label: 'Followers', children: `${userFollowers}` },
    { key: '2', label: 'Repositories', children: `${userRepos}` },
  ];

  const fetchUserFollowers = async () => {
    const followers = await fetch(
      'https://api.github.com/users/zarakkhattak96/followers',
    );

    const data = await followers.json();

    setUserFollowers(data);

    console.log(data, 'Followers');
  };

  const fetchUserRepos = async () => {
    const repos = await fetch(
      'https://api.github.com/users/zarakkhattak96/repos',
    );

    const data = await repos.json();

    console.log(data, 'Repos');

    setUserRepos(data);
  };

  return (
    <>
      <Flex vertical gap='middle' wrap='wrap'>
        <Input
          placeholder='Start typing here ..'
          maxLength={50}
          size='large'
          type='text'
          style={{
            borderRadius: '0',
            height: '50px',
            width: '100%',
            maxWidth: '500px',
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Select
          placeholder='User'
          options={[
            { value: 'user', label: 'User' },
            { value: 'repo', label: 'Repository' },
          ]}
          style={{
            width: '40%',
            // maxWidth: '500px',
            height: '50px',
            borderRadius: '0',
            left: '380px',
            bottom: '66px',
          }}
          size='large'
          onChange={searchProfile}
        />
      </Flex>

      <Card style={{ marginTop: '20px', maxWidth: '400px', height: '400px' }}>
        {userProfile && (
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
                  height: '100px',
                  width: '100px',
                }}
              />
              <Title level={4}>{userProfile?.login}</Title>
            </Space>
            {/* {JSON.stringify(userProfile)} */}

            <>
              <Segmented
                defaultValue='center'
                style={{ marginBottom: 8 }}
                // options={['Followers', 'Repositories']}
              />
              <Tabs
                // defaultActiveKey='1'
                items={items.map((e) => ({
                  key: e.key,
                  label: e.label,
                  children: e.children,
                }))}
                onChange={fetchUserFollowers}
                indicator={{ size: (origin) => origin - 20 }}
              />
            </>
          </div>
        )}
      </Card>
    </>
  );
}
