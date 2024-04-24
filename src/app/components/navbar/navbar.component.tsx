import { GithubOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import { useStyle } from '../../../styles/style';

const { Title } = Typography;
export default function NavBar() {
  const { styles } = useStyle();
  return (
    <>
      <Row>
        <Col span={12}>
          <Row justify={'center'}>
            <GithubOutlined className={styles.githubOutlined} />

            <Title level={2}>Github Searcher</Title>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Typography.Paragraph type='secondary' className={styles.githubTitle}>
            Search users or repositories below
          </Typography.Paragraph>
        </Col>
      </Row>
    </>
  );
}
