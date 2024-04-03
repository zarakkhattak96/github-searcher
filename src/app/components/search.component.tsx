import { useState } from 'react';
import { Flex, Input, Dropdown, Space, Button, Select } from 'antd';
import type { MenuProps } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

export default function Search() {
  const [userName, setUserName] = useState('');

  const userUrl = `https://api.github.com/users/${userName}`;
  const repoUrl = `https://api.github.com/users/${userName}/repos`;

  const items: MenuProps['items'] = [
    {
      label: <a href={userUrl}>Users</a>,
      key: '0',
    },
    {
      label: <a href={repoUrl}>Repositories</a>,
      key: '1',
    },
  ];

  return (
    <>
      <Space>
        <GithubOutlined className='github-logo' />

        <h2 className='title'>Github Search</h2>
      </Space>
      <Flex vertical gap={12}>
        <Input
          type='text'
          placeholder='Start typing to search ..'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='search-input'
        />

        <Select className='dropdown-menu' placeholder='Select an option'>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Space>
              <Button className='button'> User</Button>
            </Space>
          </Dropdown>
        </Select>
      </Flex>
    </>
  );
}
