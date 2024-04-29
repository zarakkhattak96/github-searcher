import { Anchor, Card, Col, Row, Typography, Image, Flex } from 'antd';
import Meta from 'antd/es/card/Meta';
import { fetchUserRepos } from '../../../services/github.service';
import { IContentComponentProps } from '../../../utils/interfaces.utils';
import React from 'react';
import { useStyle } from '../../../styles/style';

const { Title } = Typography;

export const ContentComponent: React.FC<IContentComponentProps> = ({
  userProfile,
  isRepoExpanded,
  setIsRepoExpanded,
  expandedUserRepos,
  setExpandedUserRepos,
  activeColor,
  setActiveColor,
}) => {
  const { styles } = useStyle();
  const toggleReposCard = async (username: string) => {
    setIsRepoExpanded((prevState) => !prevState);

    if (!isRepoExpanded) {
      const repos = await fetchUserRepos(username);
      setExpandedUserRepos(repos);
    }
  };
  return (
    <div className={styles.cards} id='contentDiv'>
      {userProfile.length > 0 && (
        <Row>
          {userProfile?.map((profile, index) => (
            <Col key={index}>
              {profile.login !== undefined && (
                <Card
                  onClick={() => {
                    toggleReposCard(profile.login);
                    setActiveColor(profile.background as string);
                  }}
                  hoverable
                  style={{
                    width: '150px',
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
      <Flex className={styles.cards}>
        <Row>
          <Col>
            {!isRepoExpanded ? null : (
              <Row>
                {expandedUserRepos?.map((repo, index) => (
                  <Col key={index}>
                    {repo.name !== undefined && (
                      <Card
                        hoverable
                        style={{
                          // width: 240,
                          background: activeColor,
                        }}
                        className={styles.reposCard}
                      >
                        <Meta
                          title={repo.name}
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
                          <Title level={5}>
                            Stars: {repo.stargazers_count}
                          </Title>
                        </div>
                      </Card>
                    )}
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Flex>
    </div>
  );
};
