import { Col, Flex, Row, Skeleton, Space, Spin } from 'antd';
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
  userProfile,
  userRepositories,
  handleChange,
  handleInputChange,
  selectedOption,
  setSelectedOption,
  isLoading,
}) => {
  const { styles } = useStyle();

  return (
    <Flex vertical={true} className={styles.layout}>
      <Space
        align={
          userProfile.length > 0 || userRepositories.length > 0
            ? 'start'
            : 'center'
        }
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
            <Spin
              size='large'
              spinning={
                userProfile.length > 0 || userRepositories.length > 0
                  ? false
                  : isLoading
              }
              className={styles.skeletonStyle}
            >
              <SearchInputComponent
                username={username}
                setUsername={setUsername}
                handleInputChange={handleInputChange}
              />
            </Spin>

            <SelectCommonComponent
              username={username}
              userRepos={userRepositories}
              handleChange={handleChange}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </Col>
        </Row>
      </Space>

      <Row>
        <Skeleton
          active={true}
          loading={
            userProfile.length > 0 || userRepositories.length > 0
              ? false
              : isLoading
          }
          className={styles.skeletonStyle}
          title={false}
          paragraph={{
            rows: 5,
          }}
        >
          <Space className={styles.withContent}>
            <Row>
              <Col>
                <ContentComponent
                  userProfile={userProfile}
                  userRepositories={userRepositories}
                  isLoading={isLoading}
                />
              </Col>
            </Row>
          </Space>
        </Skeleton>
      </Row>
    </Flex>
  );
};
