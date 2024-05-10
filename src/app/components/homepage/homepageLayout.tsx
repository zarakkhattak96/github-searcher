import { Col, Flex, Row, Space } from 'antd';
import { IHomePageComponentProps } from '../../../utils/interfaces';
import { SearchInputComponent } from '../common/searchInput/searchInput';
import { SelectCommonComponent } from '../common/select/select';
import { ContentComponent } from '../content/content';
import NavBar from './homepageNavbar';
import { ThemeSwitcher } from './homepageThemeSwitcher';
import { useStyle } from '../../../styles/style';

export type entityType = 'user' | 'repos';
export const HomePageLayout: React.FC<IHomePageComponentProps> = ({
  username,
  setUsername,
  debouncedProfile,
  userProfile,
  userRepositories,
  debouncedRepos,
}) => {
  const { styles } = useStyle();

  return (
    <Flex vertical={true} className={styles.layout}>
      <Space
        align={'center'}
        wrap={true}
        className={styles.withoutContent}
        direction='vertical'
      >
        <Row>
          <Col>
            <NavBar />
            <ThemeSwitcher />
          </Col>
        </Row>

        <Row>
          <Col>
            <SearchInputComponent
              username={username}
              setUsername={setUsername}
            />

            <SelectCommonComponent
              debouncedProfile={debouncedProfile}
              username={username}
              userRepos={userRepositories}
              debouncedRepos={debouncedRepos}
            />
          </Col>
        </Row>
      </Space>

      <Space align={'center'} className={styles.withContent} size={'large'}>
        <Row>
          <Col>
            <ContentComponent
              userProfile={userProfile}
              // activeColor={activeColor}
              userRepositories={userRepositories}
            />
          </Col>
        </Row>
      </Space>
    </Flex>
  );
};
