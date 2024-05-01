import { Col, Flex, Row } from 'antd';
import { IHomePageComponentProps } from '../../../utils/interfaces.utils';
import { SearchInputComponent } from '../common/searchInput/searchInput';
import { SelectCommonComponent } from '../common/select/select.common';
import { ContentComponent } from '../content/content.component';
import NavBar from '../navbar/navbar.component';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher.component';
import { useStyle } from '../../../styles/style';

export const HomePageComponent: React.FC<IHomePageComponentProps> = ({
  // username,
  // setUsername,
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
            // username={username}
            // setUsername={setUsername}
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
