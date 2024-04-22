import { Anchor, Card, Col, Flex, Row, Typography, Image } from 'antd';
import Meta from 'antd/es/card/Meta';
import { fetchUserRepos } from '../../../services/github.service';
import { IContentComponentProps } from '../../../utils/interfaces.utils';
import React from 'react';

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
  const toggleReposCard = async (username: string) => {
    setIsRepoExpanded((prevState) => !prevState);

    if (!isRepoExpanded) {
      const repos = await fetchUserRepos(username);
      setExpandedUserRepos(repos);
    }
  };
  return (
    <Flex vertical gap='middle' wrap='wrap'>
      {userProfile.length > 0 && (
        <Row gutter={[182, 8]}>
          {userProfile?.map((profile, index) => (
            <Col key={index} span={8}>
              {profile.login !== undefined && (
                <Card
                  onClick={() => {
                    toggleReposCard(profile.login);
                    setActiveColor(profile.background as string);
                  }}
                  hoverable
                  style={{
                    width: 240,
                    backgroundColor: profile.background,
                  }}
                  cover={<Image alt='user dp' src={profile.avatar_url} />}
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

      {!isRepoExpanded ? null : (
        <Row gutter={[182, 16]}>
          {expandedUserRepos?.map((repo, index) => (
            <Col key={index} span={8}>
              {repo.name !== undefined && (
                <Card
                  hoverable
                  style={{
                    width: 240,
                    background: activeColor,
                  }}
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
                    <Title level={5}>Stars: {repo.stargazers_count}</Title>
                  </div>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      )}
    </Flex>
  );
};
