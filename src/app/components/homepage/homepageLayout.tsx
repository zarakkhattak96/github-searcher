import { Col, Flex, Row, Skeleton, Space, Spin } from 'antd';
import { IHomePageComponentProps } from '../../../utils/interfaces';
import { SearchInputComponent } from '../common/searchInput/searchInput';
import { SelectCommonComponent } from '../common/select/select';
import { ContentComponent } from '../content/content';
import NavBar from './homepageNavbar';
import { ThemeSwitcher } from './homepageThemeSwitcher';
import { useStyle } from '../../../styles/style';
import { useEffect, useRef, useState } from 'react';

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
}) => {
  const { styles } = useStyle();

  const bottomBoundaryRef = useRef<any>();
  const [renderRef, setRenderRef] = useState<boolean>(false);

  const onIntersection = (entries: any[]) => {
    if (entries[0].isIntersecting) {
      console.log(conditionForBottomScroll);
      handleScroll();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && bottomBoundaryRef.current) {
      if (conditionForBottomScroll > 0) {
        // console.log(conditionForBottomScroll);
        observer.observe(bottomBoundaryRef.current);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [bottomBoundaryRef, renderRef, conditionForBottomScroll]);

  useEffect(() => {}, [conditionForBottomScroll]);

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
                handleInputChange={handleInputChange}
                username={username}
                setUsername={setUsername}
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
                  username={username}
                />
              </Col>
            </Row>
          </Space>
        </Skeleton>
      </Row>

      <div ref={bottomBoundaryRef}>This is the bottom boundary</div>
    </Flex>
  );
};
