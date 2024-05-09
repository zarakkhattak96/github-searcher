import { Col, Flex, Row } from 'antd';
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
  // activeColor,
  debouncedRepos,
}) => {
  const { styles } = useStyle();

  return (
    <>
      <Flex vertical={true} className={styles.layout}>
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

        <Row>
          <Col>
            <ContentComponent
              userProfile={userProfile}
              // activeColor={activeColor}
              userRepositories={userRepositories}
            />
          </Col>
        </Row>
      </Flex>
    </>
  );
};
