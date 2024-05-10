import { Col, Flex, Row, Space } from 'antd';
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
              handleInputChange={handleInputChange}
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

      <Space
        align={'center'}
        className={styles.withContent}
        size={'large'}
        direction='vertical'
      >
        <Row>
          <Col>
            <ContentComponent
              userProfile={userProfile}
              userRepositories={userRepositories}
            />
          </Col>
        </Row>
      </Space>
    </Flex>
  );
};
