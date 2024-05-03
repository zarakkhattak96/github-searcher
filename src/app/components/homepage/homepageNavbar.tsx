import { GithubOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import { useStyle } from '../../../styles/style';

const { Title } = Typography;
export default function NavBar() {
  const { styles } = useStyle();
  return (
    <>
      <Row>
        <Col>
          <GithubOutlined className={styles.githubOutlined} />
          <Title level={3} className={styles.homePageTitle}>
            GitHub Searcher
          </Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Typography.Paragraph type='secondary' className={styles.githubPara}>
            Search users or repositories below
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
}
