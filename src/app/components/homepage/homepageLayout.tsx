import { Col, Flex, Row, Skeleton, Space } from 'antd';
import { IHomePageComponentProps } from '../../../utils/interfaces';
import { SearchInputComponent } from '../common/searchInput/searchInput';
import { SelectCommonComponent } from '../common/select/select';
import { ContentComponent } from '../content/content';
import NavBar from './homepageNavbar';
import { ThemeSwitcher } from './homepageThemeSwitcher';
import { useStyle } from '../../../styles/style';
import useInfiniteScroll from '../../../hooks/InfiniteScrolling';
import { useEffect } from 'react';

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
  conditionForBottomScroll,
  handleScroll,
  setPage,
  page,
}) => {
  const { styles } = useStyle();

  const { ref, isInView } = useInfiniteScroll({ threshold: [0.25] });

  useEffect(() => {
    if (isInView && conditionForBottomScroll) {
      setPage((prevPage) => prevPage + 1);
      handleScroll(page);
    }
  }, [isInView]);

  return (
    <Flex vertical={true} className={styles.layout}>
      <Space
        align={
          userProfile.length > 0 || userRepositories.length > 0
            ? 'start'
            : 'center'
        }
        wrap={true}
        direction='vertical'
      >
        <Row>
          <Col className={styles.withoutContent}>
            <NavBar />
            <ThemeSwitcher />

            <SearchInputComponent
              handleInputChange={handleInputChange}
              username={username}
              setUsername={setUsername}
            />

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
            <Col>
              <ContentComponent
                userProfile={userProfile}
                userRepositories={userRepositories}
                isLoading={isLoading}
                username={username}
              />
            </Col>
          </Space>
        </Skeleton>
      </Row>

      <Row ref={ref} />
    </Flex>
  );
};
