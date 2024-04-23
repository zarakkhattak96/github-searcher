import { GithubOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Typography } from 'antd';
import { useStyle } from '../../../styles/style';

const { Title } = Typography;
export default function NavBar() {
  const { styles } = useStyle();
  return (
    <Space direction='horizontal'>
      <GithubOutlined className={styles.githubOutlined} />

      <Title level={2} className={styles.homePageTitle}>
        Github Searcher
        <Typography.Paragraph
          type='secondary'
          // style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
          className={styles.titleParagraph}
        >
          Search users or repositories below
        </Typography.Paragraph>
      </Title>
    </Space>
  );
}
