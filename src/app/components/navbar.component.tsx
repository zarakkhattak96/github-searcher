import { GithubOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
export default function NavBar() {
  return (
    <>
      <Space>
        <GithubOutlined style={{ fontSize: '35px', color: 'black' }} />

        <Title
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: '35px',
            position: 'relative',
          }}
        >
          Github Searcher
        </Title>
        {/* <h2 className='title'>Github Search</h2> */}
      </Space>
    </>
  );
}
