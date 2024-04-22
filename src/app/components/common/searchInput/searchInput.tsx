import { Flex, Space, Input, Select } from 'antd';
import { ISearchInputProps } from '../../../../utils/interfaces.utils';

export const SearchInputComponent: React.FC<ISearchInputProps> = ({
  username,
  setUsername,
  debouncedProfile,
}) => {
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
          onClick={debouncedProfile}
        />
      </Space>
    </Flex>
  );
};
