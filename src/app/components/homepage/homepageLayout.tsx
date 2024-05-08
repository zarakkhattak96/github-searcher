import { Col, Flex, Row } from 'antd';
import { IHomePageComponentProps } from '../../../utils/interfaces';
import { SearchInputComponent } from '../common/searchInput/searchInput';
import { SelectCommonComponent } from '../common/select/select';
import { ContentComponent } from '../content/content';
import NavBar from './homepageNavbar';
import { ThemeSwitcher } from './homepageThemeSwitcher';
import { useStyle } from '../../../styles/style';

export const HomePageLayout: React.FC<IHomePageComponentProps> = ({
  username,
  setUsername,
  debouncedProfile,
  userProfile,
  // isRepoExpanded,
  // setIsRepoExpanded,
  userRepositories,
  // setExpandedUserRepos,
  activeColor,
  // setActiveColor,
  debouncedRepos,
}) => {
  const { styles } = useStyle();
  // const [userRepos, setUserRepos] = useState<IRepository[]>([]);

  console.log(userRepositories, 'REPOS FROM LAYOUT');

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
              // isRepoExpanded={isRepoExpanded}
              // setIsRepoExpanded={setIsRepoExpanded}
              // expandedUserRepos={expandedUserRepos}
              // setExpandedUserRepos={setExpandedUserRepos}
              activeColor={activeColor}
              // setActiveColor={setActiveColor}
              userRepositories={userRepositories}
              // setUserRepos={setUserRepos}
            />
          </Col>
        </Row>
      </Flex>
    </>
  );
};
