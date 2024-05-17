import { Anchor, Card, Col, Row, Typography, Flex, Avatar, List } from 'antd';
import Meta from 'antd/es/card/Meta';
import { IContentComponentProps } from '../../../utils/interfaces';
import React from 'react';
import { useStyle } from '../../../styles/style';
import { useInfiniteLoading } from '../../../hooks/infiniteLoading';
// import { useInfiniteLoading } from '../../../hooks/infiniteLoading';
// import { getGitHubUsers } from '../../../services/github';

const { Title } = Typography;

export const ContentComponent: React.FC<IContentComponentProps> = ({
  userProfile,
  userRepositories,
  username,
}) => {
  const { styles } = useStyle();

  const { userProfs } = useInfiniteLoading(username);

  return (
    <Flex className={styles.cards} id='contentDiv'>
      <List
        itemLayout='vertical'
        dataSource={userProfs}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta title={user.login} description={user.html_url} />
          </List.Item>
        )}
      >
        {/* {userProfile.length > 0 && (
          <Row gutter={[36, 18]}>
            {userProfile?.map((profile, index) => (
              <Col key={index}>
                {profile.login !== undefined && (
                  <Card
                    hoverable
                    cover={
                      <Avatar
                        size={100}
                        alt='user dp'
                        src={profile.avatar_url}
                        className={styles.profileAvatar}
                      />
                    }
                    className={styles.profileCard}
                  >
                    <Meta
                      description={
                        <Anchor
                          items={[
                            {
                              key: 'profile_url',
                              href: profile.html_url,
                              title: 'Github Account',
                            },
                          ]}
                        />
                      }
                    />

                    <div>
                      <Title level={5}> {profile.login}</Title>
                      <Title level={5}>
                        Followers: {profile?.followers ?? 0}
                      </Title>
                    </div>
                  </Card>
                )}
              </Col>
            ))}
          </Row>
        )} */}
      </List>

      <Flex className={styles.cards} id='repoCards'>
        {userRepositories.length > 0 && (
          <Row gutter={[36, 18]}>
            {userRepositories?.map((repo, index) => (
              <Col key={index}>
                {repo.name !== undefined && (
                  <Card
                    hoverable
                    className={styles.reposCard}
                    title={repo.name}
                  >
                    <Meta
                      description={
                        <Anchor
                          items={[
                            {
                              key: 'repo_url',
                              href: repo.html_url,
                              title: repo.name,
                            },
                          ]}
                        />
                      }
                    />
                    <div>
                      <Title level={5}>Stars: {repo.stargazers_count}</Title>
                      <Title level={5}>Forks: {repo.forks_count}</Title>
                      <Title level={5}> Author: {repo.owner?.login} </Title>
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
