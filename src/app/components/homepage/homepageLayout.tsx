import { Col, Flex, Row } from 'antd';
import { IHomePageComponentProps } from '../../../utils/interfaces';
import { SearchInputComponent } from '../common/searchInput/searchInput';
import { SelectCommonComponent } from '../common/select/select';
import { ContentComponent } from '../content/content';
import NavBar from './homepageNavbar';
import { ThemeSwitcher } from './homepageThemeSwitcher';
import { useStyle } from '../../../styles/style';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const HomePageLayout: React.FC<IHomePageComponentProps> = ({
  // username,
  setUsername,
  debouncedProfile,
  userProfile,
  isRepoExpanded,
  setIsRepoExpanded,
  expandedUserRepos,
  setExpandedUserRepos,
  activeColor,
  setActiveColor,
}) => {
  const { styles } = useStyle();

  const selectFromStore = useSelector((state: RootState) => state.searchInput);

  const { username } = selectFromStore;
  // const dispatch = useDispatch();

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
            <SelectCommonComponent debouncedProfile={debouncedProfile} />
          </Col>
        </Row>

        <Row>
          <Col>
            <ContentComponent
              userProfile={userProfile}
              isRepoExpanded={isRepoExpanded}
              setIsRepoExpanded={setIsRepoExpanded}
              expandedUserRepos={expandedUserRepos}
              setExpandedUserRepos={setExpandedUserRepos}
              activeColor={activeColor}
              setActiveColor={setActiveColor}
            />
          </Col>
        </Row>
      </Flex>
    </>
  );
};
