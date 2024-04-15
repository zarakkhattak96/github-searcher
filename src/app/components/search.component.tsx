// import { useState } from 'react';
import { Flex, Input, Select } from 'antd';
import { useState } from 'react';

export default function Search() {
  const [username, setUsername] = useState('');

  const searchProfile = async () => {
    const response = await fetch(
      'https://api.github.com/search/users?q=zarakkhattak96',
    );

    const data = await response?.json();

    console.log(data, 'Data');
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
    </>
  );
}
