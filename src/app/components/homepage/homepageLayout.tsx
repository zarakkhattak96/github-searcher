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
  page,
}) => {
  const { styles } = useStyle();

  // TODO: To maybe move this to the infinite loading customHook

  const bottomBoundaryRef = useRef<Element>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderRef, _setRenderRef] = useState<boolean>(false);

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      handleScroll(page);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && bottomBoundaryRef.current) {
      if (conditionForBottomScroll) {
        observer.observe(bottomBoundaryRef.current);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [bottomBoundaryRef, renderRef, conditionForBottomScroll]);

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

      {/* TODO: Maybe add a spin here //!Fix the type of ref */}
      <Row ref={bottomBoundaryRef} />
    </Flex>
  );
};
