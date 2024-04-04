import { GithubOutlined } from '@ant-design/icons';
import { Space } from 'antd';

export default function NavBar() {
  return (
    <>
      <Space>
        <GithubOutlined className='github-logo' />

        <h2 className='title'>Github Search</h2>
      </Space>
    </>
  );
}
