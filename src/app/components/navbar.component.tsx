import { GithubOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
export default function NavBar() {
  return (
    <Space direction='horizontal'>
      <GithubOutlined
        style={{
          fontSize: '45px',
          color: 'var(--heading-color)',
          display: 'flex',
        }}
      />

      <Title
        level={2}
        className='github-title'
        style={{ color: 'var(--heading-color)' }}
      >
        Github Searcher
        <Typography.Paragraph
          type='secondary'
          style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
        >
          Search users or repositories below
        </Typography.Paragraph>
      </Title>
    </Space>
  );
}
