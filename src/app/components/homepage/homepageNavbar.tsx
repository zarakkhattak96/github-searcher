import { GithubOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useStyle } from '../../../styles/style';

const { Title } = Typography;
export default function NavBar() {
  const { styles } = useStyle();
  return (
    <>
      <GithubOutlined className={styles.githubOutlined} />
      <Title level={3} className={styles.homePageTitle}>
        GitHub Searcher
      </Title>

      <Typography.Paragraph type='secondary' className={styles.githubPara}>
        Search users or repositories below
      </Typography.Paragraph>
    </>
  );
}
