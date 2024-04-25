import { GithubOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import { useStyle } from '../../../styles/style';

const { Title } = Typography;
export default function NavBar() {
  const { styles } = useStyle();
  return (
    <>
      <Row>
        <Col span={24}>
          <GithubOutlined className={styles.githubOutlined} />
          <Title level={3} className={styles.homePageTitle}>
            Github Searcher
          </Title>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Typography.Paragraph
            type='secondary'
            className={styles.githubPara}
            style={{ top: 100, right: 560, position: 'relative' }}
          >
            {/* //TODO: The para styling isnt affected by the class name so added in-line styling  */}
            Search users or repositories below
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
}
