import { useState } from 'react';
import { Flex, Input, Dropdown, Select } from 'antd';
import type { MenuProps } from 'antd';

export default function Search() {
  const [userName, setUserName] = useState('');

  const userUrl = `https://api.github.com/users/${userName}`;
  const repoUrl = `https://api.github.com/users/${userName}/repos`;

  const handleClick = (selectedValue: string) => {
    if (selectedValue === userUrl) {
      window.location.href = userUrl;
    } else {
      window.location.href = repoUrl;
    }
  };

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
      <Flex vertical gap={12}>
        <Input
          type='text'
          placeholder='Start typing to search ..'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='search-input'
        />

        <Select
          className='dropdown-menu'
          placeholder='User'
          options={[
            { value: 'user', label: 'User' },
            { value: 'repo', label: 'Repository' },
          ]}
          onChange={(value) => handleClick(value)}
        >
          <Dropdown menu={{ items }} trigger={['click']} />
        </Select>
      </Flex>
    </>
  );
}
