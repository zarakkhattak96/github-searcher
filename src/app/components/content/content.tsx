import { Anchor, Card, Col, Row, Typography, Image, Flex } from 'antd';
import Meta from 'antd/es/card/Meta';
import { IContentComponentProps } from '../../../utils/interfaces';
import React from 'react';
import { useStyle } from '../../../styles/style';

const { Title } = Typography;

export const ContentComponent: React.FC<IContentComponentProps> = ({
  userProfile,
  activeColor,
  userRepositories,
}) => {
  const { styles } = useStyle();

  // const toggleReposCard = async (username: string) => {
  //   setIsRepoExpanded((prevState) => !prevState);

  //   if (!isRepoExpanded) {
  //     const repos = await fetchUserRepos(username);
  //     setExpandedUserRepos(repos);
  //   }
  // };

  return (
    <Flex className={styles.cards} id='contentDiv' gap={'large'}>
      {userProfile.length > 0 && (
        <Row gutter={8}>
          {userProfile?.map((profile, index) => (
            <Col key={index}>
              {profile.login !== undefined && (
                <Card
                  hoverable
                  style={{
                    backgroundColor: profile.background,
                  }}
                  cover={<Image alt='user dp' src={profile.avatar_url} />}
                  className={styles.profileCard}
                >
                  <Meta
                    title={profile.login}
                    description={
                      <Anchor
                        items={[
                          {
                            key: 'profile_url',
                            href: profile.html_url,
                            title: profile.login,
                          },
                        ]}
                      />
                    }
                  />

                  <div>
                    <Title level={5}>
                      Followers: {profile?.followers?.length ?? 0}
                    </Title>
                  </div>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      )}

      <Flex className={styles.cards} id='repoCards'>
        {userRepositories.length > 0 && (
          <Row gutter={8}>
            {userRepositories?.map((repo, index) => (
              <Col key={index}>
                {repo.name !== undefined && (
                  <Card
                    hoverable
                    style={{
                      backgroundColor: activeColor,
                    }}
                    className={styles.cards}
                    title={repo.name}
                  >
                    <Meta
                      description={
                        <Anchor
                          items={[
                            {
                              key: 'profile_url',
                              href: repo.html_url,
                              title: repo.name,
                            },
                          ]}
                        />
                      }
                    />
                    <div>
                      <Title level={5}>Stars: {repo.stargazers_count}</Title>
                    </div>
                  </Card>
                )}
              </Col>
            ))}
          </Row>
        )}
      </Flex>
    </Flex>
  );
};
