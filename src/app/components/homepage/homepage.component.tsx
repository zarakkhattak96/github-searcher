import { Col, Flex, Row, Space } from 'antd';
import { IHomePageComponentProps } from '../../../utils/interfaces.utils';
import { SearchInputComponent } from '../common/searchInput/searchInput';
import { SelectCommonComponent } from '../common/select/select.common';
import { ContentComponent } from '../content/content.component';
import NavBar from '../navbar/navbar.component';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher.component';
import { useStyle } from '../../../styles/style';

export const HomePageComponent: React.FC<IHomePageComponentProps> = ({
  username,
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
  return (
    <>
      <div className={styles.layout}>
        <Flex vertical={true} gap={'small'}>
          <Row>
            <Col span={24}>
              <NavBar />
              <ThemeSwitcher />
            </Col>
          </Row>

          <Row>
            <Col span={48}>
              <SearchInputComponent
                username={username}
                setUsername={setUsername}
              />
              <SelectCommonComponent debouncedProfile={debouncedProfile} />
            </Col>
          </Row>
        </Flex>
      </div>

      <div>
        <Space>
          <Row>
            <Col span={21}>
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
        </Space>
      </div>
    </>
  );
};
